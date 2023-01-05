/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type City = {
  __typename?: 'City';
  country: Scalars['String'];
  id: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  sunrise: Scalars['Int'];
  sunset: Scalars['Int'];
  timezone: Scalars['Int'];
};

export type Forecast = {
  __typename?: 'Forecast';
  clouds: Scalars['Float'];
  date: Scalars['DateTime'];
  dayIcon: Scalars['String'];
  description: Scalars['String'];
  feelsLike: Scalars['Float'];
  humidity: Scalars['Float'];
  main: Scalars['String'];
  maxTemperature: Scalars['Float'];
  minTemperature: Scalars['Float'];
  nightIcon: Scalars['String'];
  pressure: Scalars['Float'];
  rain?: Maybe<Scalars['Float']>;
  seaLevel: Scalars['Float'];
  snow?: Maybe<Scalars['Float']>;
  temperature: Scalars['Float'];
  visibility: Scalars['Float'];
  windDegrees: Scalars['Float'];
  windSpeed: Scalars['Float'];
};

export type ForecastWeatherDto = {
  __typename?: 'ForecastWeatherDTO';
  city: City;
  count: Scalars['Int'];
  results: Array<Maybe<Forecast>>;
};

export type GeoCodeDto = {
  __typename?: 'GeoCodeDTO';
  country: Scalars['String'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  name: Scalars['String'];
};

export type GeoCodeInput = {
  city: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutInfo = {
  __typename?: 'LogoutInfo';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  logout: LogoutInfo;
  signUp: User;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type PreferencesInputDto = {
  lang?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentWeather: RegionWeatherDto;
  forecastWeather: ForecastWeatherDto;
  geoCode: Array<GeoCodeDto>;
};


export type QueryCurrentWeatherArgs = {
  input: WeatherInputDto;
  preferences?: InputMaybe<PreferencesInputDto>;
};


export type QueryForecastWeatherArgs = {
  input: WeatherInputDto;
  limit?: InputMaybe<Scalars['Int']>;
  pref?: InputMaybe<PreferencesInputDto>;
};


export type QueryGeoCodeArgs = {
  input: GeoCodeInput;
  limit?: InputMaybe<Scalars['Float']>;
};

export type RegionWeatherDto = {
  __typename?: 'RegionWeatherDTO';
  city: Scalars['String'];
  clouds: Scalars['Float'];
  country: Scalars['String'];
  date: Scalars['DateTime'];
  dayIcon: Scalars['String'];
  description: Scalars['String'];
  feelsLike: Scalars['Float'];
  humidity: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  main: Scalars['String'];
  maxTemperature: Scalars['Float'];
  minTemperature: Scalars['Float'];
  nightIcon: Scalars['String'];
  pressure: Scalars['Float'];
  rain?: Maybe<Scalars['Float']>;
  snow?: Maybe<Scalars['Float']>;
  sunrise: Scalars['Int'];
  sunset: Scalars['Int'];
  temperature: Scalars['Float'];
  timezone: Scalars['Float'];
  visibility: Scalars['Float'];
  windDegrees: Scalars['Float'];
  windSpeed: Scalars['Float'];
};

export type SignUpInput = {
  confirmationPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  username: Scalars['String'];
};

export type WeatherInputDto = {
  city?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', username: string, email: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutInfo', success: boolean } };

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmationPassword: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', username: string, email: string } };

export type CurrentWeatherByLocationQueryQueryVariables = Exact<{
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
}>;


export type CurrentWeatherByLocationQueryQuery = { __typename?: 'Query', currentWeather: { __typename?: 'RegionWeatherDTO', main: string, description: string, dayIcon: string, nightIcon: string, date: any, timezone: number, latitude: number, longitude: number, city: string, country: string, sunrise: number, sunset: number, clouds: number, windSpeed: number, windDegrees: number, visibility: number, feelsLike: number, temperature: number, minTemperature: number, maxTemperature: number, pressure: number, humidity: number, rain?: number | null, snow?: number | null } };

export type ForecastFragmentFragment = { __typename?: 'Forecast', windDegrees: number, temperature: number, maxTemperature: number, minTemperature: number, feelsLike: number, pressure: number, seaLevel: number, snow?: number | null, rain?: number | null, clouds: number, description: string, date: any, dayIcon: string, nightIcon: string, humidity: number, main: string, visibility: number, windSpeed: number } & { ' $fragmentName'?: 'ForecastFragmentFragment' };

export type CityFragmentFragment = { __typename?: 'City', id: number, latitude: number, longitude: number, name: string, country: string, sunrise: number, sunset: number } & { ' $fragmentName'?: 'CityFragmentFragment' };

export type ForecastByCityNameQueryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  city: Scalars['String'];
}>;


export type ForecastByCityNameQueryQuery = { __typename?: 'Query', forecastWeather: { __typename?: 'ForecastWeatherDTO', results: Array<(
      { __typename?: 'Forecast' }
      & { ' $fragmentRefs'?: { 'ForecastFragmentFragment': ForecastFragmentFragment } }
    ) | null> } };

export type ForecastByCoordinatesQueryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  lat: Scalars['Float'];
  long: Scalars['Float'];
}>;


export type ForecastByCoordinatesQueryQuery = { __typename?: 'Query', forecastWeather: { __typename?: 'ForecastWeatherDTO', results: Array<{ __typename?: 'Forecast', windDegrees: number, temperature: number, maxTemperature: number, minTemperature: number, feelsLike: number, pressure: number, seaLevel: number, snow?: number | null, rain?: number | null, clouds: number, description: string, date: any, dayIcon: string, nightIcon: string, humidity: number, main: string, visibility: number, windSpeed: number } | null> } };

export type CityInfoByNameQueryQueryVariables = Exact<{
  city: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
}>;


export type CityInfoByNameQueryQuery = { __typename?: 'Query', geoCode: Array<{ __typename?: 'GeoCodeDTO', name: string, country: string, lat: number, lon: number }> };

export const ForecastFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ForecastFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Forecast"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"windDegrees"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"maxTemperature"}},{"kind":"Field","name":{"kind":"Name","value":"minTemperature"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLike"}},{"kind":"Field","name":{"kind":"Name","value":"pressure"}},{"kind":"Field","name":{"kind":"Name","value":"seaLevel"}},{"kind":"Field","name":{"kind":"Name","value":"snow"}},{"kind":"Field","name":{"kind":"Name","value":"rain"}},{"kind":"Field","name":{"kind":"Name","value":"clouds"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"clouds"}},{"kind":"Field","name":{"kind":"Name","value":"dayIcon"}},{"kind":"Field","name":{"kind":"Name","value":"nightIcon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLike"}},{"kind":"Field","name":{"kind":"Name","value":"humidity"}},{"kind":"Field","name":{"kind":"Name","value":"main"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"windDegrees"}},{"kind":"Field","name":{"kind":"Name","value":"windSpeed"}}]}}]} as unknown as DocumentNode<ForecastFragmentFragment, unknown>;
export const CityFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"City"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"sunrise"}},{"kind":"Field","name":{"kind":"Name","value":"sunset"}}]}}]} as unknown as DocumentNode<CityFragmentFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmationPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"confirmationPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmationPassword"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const CurrentWeatherByLocationQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentWeatherByLocationQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lat"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"long"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentWeather"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lat"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"long"},"value":{"kind":"Variable","name":{"kind":"Name","value":"long"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"main"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dayIcon"}},{"kind":"Field","name":{"kind":"Name","value":"nightIcon"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"sunrise"}},{"kind":"Field","name":{"kind":"Name","value":"sunset"}},{"kind":"Field","name":{"kind":"Name","value":"clouds"}},{"kind":"Field","name":{"kind":"Name","value":"windSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"windDegrees"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLike"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"minTemperature"}},{"kind":"Field","name":{"kind":"Name","value":"maxTemperature"}},{"kind":"Field","name":{"kind":"Name","value":"pressure"}},{"kind":"Field","name":{"kind":"Name","value":"humidity"}},{"kind":"Field","name":{"kind":"Name","value":"rain"}},{"kind":"Field","name":{"kind":"Name","value":"snow"}}]}}]}}]} as unknown as DocumentNode<CurrentWeatherByLocationQueryQuery, CurrentWeatherByLocationQueryQueryVariables>;
export const ForecastByCityNameQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ForecastByCityNameQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forecastWeather"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ForecastFragment"}}]}}]}}]}},...ForecastFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ForecastByCityNameQueryQuery, ForecastByCityNameQueryQueryVariables>;
export const ForecastByCoordinatesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ForecastByCoordinatesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lat"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"long"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forecastWeather"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lat"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"long"},"value":{"kind":"Variable","name":{"kind":"Name","value":"long"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"windDegrees"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"maxTemperature"}},{"kind":"Field","name":{"kind":"Name","value":"minTemperature"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLike"}},{"kind":"Field","name":{"kind":"Name","value":"pressure"}},{"kind":"Field","name":{"kind":"Name","value":"seaLevel"}},{"kind":"Field","name":{"kind":"Name","value":"snow"}},{"kind":"Field","name":{"kind":"Name","value":"rain"}},{"kind":"Field","name":{"kind":"Name","value":"clouds"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"clouds"}},{"kind":"Field","name":{"kind":"Name","value":"dayIcon"}},{"kind":"Field","name":{"kind":"Name","value":"nightIcon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLike"}},{"kind":"Field","name":{"kind":"Name","value":"humidity"}},{"kind":"Field","name":{"kind":"Name","value":"main"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"windDegrees"}},{"kind":"Field","name":{"kind":"Name","value":"windSpeed"}}]}}]}}]}}]} as unknown as DocumentNode<ForecastByCoordinatesQueryQuery, ForecastByCoordinatesQueryQueryVariables>;
export const CityInfoByNameQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CityInfoByNameQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geoCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}}]}}]}}]} as unknown as DocumentNode<CityInfoByNameQueryQuery, CityInfoByNameQueryQueryVariables>;