import { renderCards } from './render-cards.js';
import { getAds } from './data.js';
import { initForm } from './form.js';

renderCards(getAds());
initForm();
