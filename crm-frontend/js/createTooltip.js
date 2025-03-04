export const contactTooltip = (type, value) => {
  const $tooltip = document.createElement("div"),
    $tooltipType = document.createElement("span"),
    $tooltipValue = document.createElement("a");

  $tooltip.classList.add('contact-tooltip', 'app-tooltip');
  $tooltipType.classList.add('contact-tooltip__type');
  $tooltipValue.classList.add('contact-tooltip__value');

  $tooltipType.textContent = type + ': ';
  $tooltipValue.textContent = value;

  $tooltip.append($tooltipType, $tooltipValue);

  return {
    $tooltip,
    $tooltipType,
    $tooltipValue
  }
};
