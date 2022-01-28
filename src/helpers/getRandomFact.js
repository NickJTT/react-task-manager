import axios from 'axios';

export default async function getRandomFact() {
  const url = 'https://uselessfacts.jsph.pl/random.json';
  return (await axios.get(url)).data.text;
}