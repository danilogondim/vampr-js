class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let counter = 0;
    let currentVampire = this;
    while (currentVampire.creator !== null) {
      currentVampire = currentVampire.creator;
      counter++;
    }
    return counter;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Searches for a descendant of a vampire with a specific name and returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    let vampire;

    if (!vampire && this.name === name) {
      vampire = this;
    } else if (!vampire && this.offspring.length === 0) {
      vampire = null;
    }

    for (const descendant of this.offspring) {
      if (!vampire) {
        vampire = descendant.vampireWithName(name);
      }
    }

    return vampire;
  }

  // Returns the total number of descendents that a vampire has
  get totalDescendents() {

    let total = 0;

    for (const descendant of this.offspring) {
      total++;
      total += descendant.totalDescendents;
    }

    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];

    if (this.yearConverted > 1980) {
      millennials.push(this);
    }

    for (const vampire of this.offspring) {
      const offspringMillennials = vampire.allMillennialVampires;
      millennials = millennials.concat(offspringMillennials);
    }

    return millennials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const thisAncestors = [];
    const vampireAncestors = [];
    let currentVampire = this;
    while (currentVampire !== null) {
      thisAncestors.push(currentVampire);
      currentVampire = currentVampire.creator;
    }
    currentVampire = vampire;
    while (currentVampire !== null) {
      vampireAncestors.push(currentVampire);
      currentVampire = currentVampire.creator;
    }
    return thisAncestors.filter(ancestor => vampireAncestors.includes(ancestor))[0];
  }
}

module.exports = Vampire;