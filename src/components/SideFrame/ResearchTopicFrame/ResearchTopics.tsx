export type ResearchTopic = {
  id: number;
  title: string;
  description: string;
  description_augmented: string;
};

export const researchTopics: ResearchTopic[] = [
  {
    id: 1,
    title:
      "Modelling heavy quark bound states in ultrarelativistic heavy-ion collisions at the LHC at CERN",
    description:
      "This project focuses on heavy quarkonia (charmonium, bottomonium) in high-energy collisions at LHC, CERN. It aims to use quarkonia as a thermometer for studying high temperatures (over 10^12K) in heavy-ion collisions. The project involves simulating the thermalization of quark-antiquark pairs in a gluon environment, using quantum chromodynamics theory. This requires computer simulations instead of perturbation theory due to strong quark-gluon interactions. The project will also explore an open quantum systems approach, a technique from condensed matter physics, to understand how quarkonium reaches thermal equilibrium.",
    description_augmented:
      "This project focuses on heavy quarkonia (charmonium, bottomonium) in high-energy collisions at LHC, CERN. It aims to use quarkonia as a thermometer for studying high temperatures (over 10^12K) in heavy-ion collisions. The project involves simulating the thermalization of quark-antiquark pairs in a gluon environment, using quantum chromodynamics theory. This requires computer simulations instead of perturbation theory due to strong quark-gluon interactions. The project will also explore an open quantum systems approach, a technique from condensed matter physics, to understand how quarkonium reaches thermal equilibrium.",
  },
  {
    id: 2,
    title: "Nevanlinna spectral reconstruction",
    description:
      "This project focuses on simulating quantum systems with strong interactions, a key area in theoretical physics. It involves studying these systems across various energy scales, such as nuclear matter in high-temperature collisions and electron dynamics in materials. A major challenge is conducting these simulations in an artificial 'imaginary time domain,' which requires reconstructing relevant physics data for practical use. This reconstruction is an inverse problem, tackled using modern data analysis methods. The thesis explores solving these inverse problems through Bayesian inference and the Nevanlinna analytic continuation technique, a method related to the Pade approximation.",
    description_augmented:
      "This project focuses on simulating quantum systems with strong interactions, a key area in theoretical physics. It involves studying these systems across various energy scales, such as nuclear matter in high-temperature collisions and electron dynamics in materials. A major challenge is conducting these simulations in an artificial 'imaginary time domain,' which requires reconstructing relevant physics data for practical use. This reconstruction is an inverse problem, tackled using modern data analysis methods. The thesis explores solving these inverse problems through Bayesian inference and the Nevanlinna analytic continuation technique, a method related to the Pade approximation.",
  },
  {
    id: 3,
    title: "Quantum Brownian Motion",
    description:
      'This project explores quantum Brownian motion, a concept crucial in quantum computing and ultra cold quantum gases research. It investigates how to measure the temperature of atoms at extremely low temperatures using the quantum behavior of probe particles. This Bachelor thesis covers the "Theory of open quantum systems," providing a foundational understanding of quantum and classical Brownian motion. It includes developing software to simulate the one-dimensional Caldeira-Leggett model, enhancing skills in numerical simulation for complex quantum systems.',
    description_augmented:
      'This project explores quantum Brownian motion, a concept crucial in quantum computing and ultra cold quantum gases research. It investigates how to measure the temperature of atoms at extremely low temperatures using the quantum behavior of probe particles. This Bachelor thesis covers the "Theory of open quantum systems," providing a foundational understanding of quantum and classical Brownian motion. It includes developing software to simulate the one-dimensional Caldeira-Leggett model, enhancing skills in numerical simulation for complex quantum systems.',
  },
];
