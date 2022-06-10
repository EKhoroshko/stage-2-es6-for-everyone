import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const leftIndikator = document.querySelector('#left-fighter-indicator');
    const rightIndikator = document.querySelector('#right-fighter-indicator');

    leftIndikator.style.width = '100%';
    rightIndikator.style.width = '100%';

    firstFighter = {
      ...firstFighter,
      healthPercent: 100 / firstFighter.health,
      crit: true,
    }

    secondFighter = {
      ...secondFighter,
      crit: true,
      healthPercent: 100 / secondFighter.health,
    }

    let startFight = true;
    let pressCode = [];

    document.addEventListener("keydown", function (event) {
      pressCode.push(event.code);
      if (controls.PlayerOneCriticalHitCombination.every(key => pressCode.includes(key)) && firstFighter.crit === true) {
        secondFighter.health -= getCriticalPower(firstFighter);
        rightIndikator.style.width = secondFighter.health * secondFighter.healthPercent + '%';
        firstFighter.crit = false;
        setTimeout(() => {
          firstFighter.crit = true;
        }, 10000);
      }

      if (controls.PlayerTwoCriticalHitCombination.every(key => pressCode.includes(key)) && secondFighter.crit === true) {
        firstFighter.health -= getCriticalPower(secondFighter);
        leftIndikator.style.width = firstFighter.health * firstFighter.healthPercent + '%';
        secondFighter.crit = false;
        setTimeout(() => {
          secondFighter.crit = true;
        }, 10000);
      }
    });

    document.addEventListener("keyup", function (event) {
      if (pressCode.length == 0) return;
      pressCode.length = 0;

      if (event.code === controls.PlayerOneAttack) {
        secondFighter.health -= getDamage(firstFighter, secondFighter);
        rightIndikator.style.width = secondFighter.health * secondFighter.healthPercent + '%';
        if (secondFighter.health <= 0) {
          rightIndikator.style.width = '0%';
          startFight = false;
          resolve(firstFighter)
        }
      }

      if (event.code === controls.PlayerTwoAttack) {
        firstFighter.health -= getDamage(secondFighter, firstFighter);
        leftIndikator.style.width = firstFighter.health * secondFighter.healthPercent + "%";
        if (firstFighter.health <= 0) {
          leftIndikator.style.width = '0%';
          startFight = false;
          resolve(secondFighter)
        }
      }
    });
  });
};

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender)
  if (damage > 0) {
    return damage;
  } else {
    return 0;
  }
}

export function getHitPower(fighter) {
  // return hit power
  let criticalHitChance = Math.random() + 1;
  const powerHit = fighter.attack * criticalHitChance;
  return powerHit;
}

export function getBlockPower(fighter) {
  // return block power
  let dodgeChance = Math.random() + 1
  const powerDef = fighter.defense * dodgeChance;
  return powerDef;
}

export function getCriticalPower(fighter) {
  return 2 * fighter.attack;
}
