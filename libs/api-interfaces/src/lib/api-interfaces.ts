export interface City {
  id: string;
  cityName: string;
  location: string;
  facts: string;
  crimeRate: number;
  touristAttraction: boolean;
}

export const emptyCity = {
  id: '',
  cityName: '',
  location: '',
  facts: '',
  crimeRate: 0,
  touristAttraction: false,
};
