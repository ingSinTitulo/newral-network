import { NeuralNetwork } from "./lib/NeuralNetwork";

const neural_network: NeuralNetwork = new NeuralNetwork();

console.log('Random starting synaptic weights: ');
console.log(neural_network.synaptic_weights);

const training_set_inputs = [[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]];
const training_set_outputs = [[0, 1, 1, 0]].transpose();

neural_network.train(training_set_inputs, training_set_outputs, 10000);

console.log('New synaptic weights after training: ');
console.log(neural_network.synaptic_weights);

console.log('Infer new situation [1, 0, 0] -> ?: ');
console.log(neural_network.think([1, 0, 0]));
