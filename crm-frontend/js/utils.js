import { contactTooltip } from "./createTooltip.js";
import { emailSvg, fbSvg, otherSvg, phoneSvg, vkSvg } from "./svg.js";

export const formatDate = (data) => {
  const newDate = new Date(data);

  const appDate = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const dateResult = newDate.toLocaleString("ru", appDate);

  return dateResult;
};

export const formatTime = (data) => {
  const newDate = new Date(data);

  const appTime = {
    hour: "numeric",
    minute: "numeric",
  };

  const timeResult = newDate.toLocaleString("ru", appTime);

  return timeResult;
};

export const createContactLink = (type, value, element, svg, item) => {
  const setTooltip = contactTooltip(type, value);

  element = document.createElement("a");
  element.classList.add("contact__link");
  element.innerHTML = svg;

  if (type === "Email") {
    element.href = `mailto:${value.trim()}`;
  } else if (type === "Телефон") {
    element.href = `tel:${value.trim()}`;
    setTooltip.$tooltipValue.style.color = 'var(--white)';
    setTooltip.$tooltipValue.style.textDecoration = 'none';
  } else {
    element.href = value.trim();
  }

  element.append(setTooltip.$tooltip);
  item.append(element);
};

export const createItemByType = (type, value, item) => {
  switch (type) {
    case "Телефон":
      let phone;
      createContactLink(type, value, phone, phoneSvg, item);
      break;
    case "Email":
      let email;
      createContactLink(type, value, email, emailSvg, item);
      break;
    case "VK":
      let vk;
      createContactLink(type, value, vk, vkSvg, item);
      break;
    case "Facebook":
      let fb;
      createContactLink(type, value, fb, fbSvg, item);
      break;
    case "Другое":
      let other;
      createContactLink(type, value, other, otherSvg, item);
      break;

    default:
      break;
  }
};
