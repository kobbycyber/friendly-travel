export interface TripEntry {
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  price: string;
  body: any; //rich text
}

export interface PersonalInformation {
  name: string;
  email: string;
  phone: string;
  street: string;
  postCode: string;
  city: string;
}

export interface AdditionalChoices {
  room: string;
  departure: string;
}

export interface SubmitFormInput {
  trip: TripEntry;
  personalInformation: PersonalInformation;
  additionalChoices: AdditionalChoices;
}

export type SetAdditionalChoices = (input: AdditionalChoices) => void;

export type HandleNextBookingStep1 = (input: PersonalInformation) => void;

export type SetStep = (input: number) => void;
