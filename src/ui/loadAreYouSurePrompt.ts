import type { MyEvent } from "../domain/MyEvent";
import { contentEl } from "./common";
import { EventHandler } from "./EventHandler";
import { loadProjectOverviewPage } from "./loadProjectOverviewPage";

export function loadAreYouSurePrompt(event: MyEvent) {
  const form = document.createElement("form");
  const title = document.createElement("h2");
  title.textContent = "Are you sure?";
  form.appendChild(title);

  const btnWrapper = document.createElement("div");
  btnWrapper.style.display = "flex";
  btnWrapper.style.justifyContent = "space-around";

  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Yes ✅";
  yesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    EventHandler.handle(event);
  });
  btnWrapper.appendChild(yesBtn);

  const noBtn = document.createElement("button");
  noBtn.textContent = "No ❌";
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loadProjectOverviewPage();
  });
  btnWrapper.appendChild(noBtn);

  form.appendChild(btnWrapper);

  contentEl.appendChild(form);
}
