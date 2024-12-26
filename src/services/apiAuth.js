import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  try {
    // Step 1: Save the current session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) throw new Error("Could not save current session");

    const currentSession = sessionData.session;

    // Step 2: Sign up the new user
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, avatar: "" },
      },
    });

    if (signUpError) throw new Error(signUpError.message);

    // Step 3: Restore the admin session
    if (currentSession) {
      const { error: restoreError } = await supabase.auth.setSession(
        currentSession
      );
      if (restoreError) throw new Error("Failed to restore the session");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
export async function updateCurrentData({ fullName, avatar, currentPassword, password }) {
  let updateData = {};

  // Fetch the current user's email
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw new Error("Failed to fetch current user data");
  }
  const email = userData.user.email;

  if (currentPassword) {
    // Re-authenticate the user with the current password
    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });
    if (reauthError) {
      throw new Error("Current password is incorrect");
    }
  }

  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  // Update user credentials (password and full name).
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }

  // If no avatar is provided, return the updated user data.
  if (!avatar) return data;

  // Use the same filename every time based on user ID
  const fileName = `avatar-${data.user.id}`; // Consistent file name

  // Upload the avatar image (this will overwrite the old one)
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar, { upsert: true });

  if (storageError) {
    throw new Error(storageError.message);
  }

  // Get the URL for the uploaded avatar.
  const avatarUrl = `https://qoykuggtnhkagvjcixgn.supabase.co/storage/v1/object/public/avatar/${fileName}?bust=${+Date.now()}`;

  // Update the user with the new avatar URL.
  const { data: updatedData, error: updateError } =
    await supabase.auth.updateUser({
      data: { avatar: avatarUrl },
    });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedData;
}
