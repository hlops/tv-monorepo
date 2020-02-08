import { writable } from "svelte/store";

export const guides = writable<string[]>([]);

function loadGuides(): void {
  fetch("//localhost:3000/tvGuide")
    .then(response => response.json())
    .then(json => guides.set(json.names))
    .then();
}

loadGuides();
