import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  const { attack, defense, health, name } = fighter;
  const avatar = createFighterImage(fighter)
  const figterName = createElement({ tagName: 'h3', className: 'fighter-preview___name' });
  const fighterAttack = createElement({ tagName: 'p', className: 'fighter-preview___stat' });
  const fighterDefense = createElement({ tagName: 'p', className: 'fighter-preview___stat' });
  const fighterHealth = createElement({ tagName: 'p', className: 'fighter-preview___stat' });

  figterName.textContent = name;
  fighterAttack.textContent = `Attack: ${attack}`;
  fighterDefense.textContent = `Defense: ${defense}`;
  fighterHealth.textContent = `Health: ${health}`;

  fighterElement.append(avatar, figterName, fighterAttack, fighterDefense, fighterHealth);
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
