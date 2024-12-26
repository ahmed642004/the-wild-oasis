import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSetting";
import Button from "../../ui/Button";
import styled from "styled-components";
function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const Div = styled.div`
    text-align: right;
  `;
  const { editSetting, isEditing } = useEditSettings();
  let updatedValues = {};
  if (isLoading) return <Spinner />;
  function handleUpdate(e, field) {
    const { value } = e.target;
    updatedValues = { ...updatedValues, [field]: value };
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleClick() {
    editSetting(updatedValues);
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            onChange={(e) => handleUpdate(e, "minBookingLength")}
            disabled={isEditing}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            onChange={(e) => handleUpdate(e, "maxBookingLength")}
            disabled={isEditing}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            onChange={(e) => handleUpdate(e, "maxGuestsPerBooking")}
            disabled={isEditing}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            onChange={(e) => handleUpdate(e, "breakfastPrice")}
            disabled={isEditing}
          />
        </FormRow>
        {<Button onClick={handleClick}>Save</Button>}
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
