import { VectorOps } from './VectorOps';
import { Random } from './Random';
import './transpose';
import { dot } from './dot';

export class NeuralNetwork
{
    public synaptic_weights: number[][];

    public constructor ()
    {
        Random.seed(1);
        this.synaptic_weights = VectorOps.Operate(VectorOps.Operate(2, '*', Random.generate([3, 1])), '-', 1);
    }

    private __sigmoid(x: any[])
    {
        return VectorOps.Operate( 1, '/', ( VectorOps.Operate(1, '+', VectorOps.Operate(Math.E, '^', VectorOps.Operate(x, '-', VectorOps.Operate(2, '*', x)) )) ) );
    }
    
    private __sigmoid_derivative(x: number | number[][])
    {
        return VectorOps.Operate(x, '*', (VectorOps.Operate(1, '-', x)));
    }

    public train(training_set_inputs: number[][], training_set_outputs: number[][], number_of_training_iterations: number)
    {
        for (let r = 0; r < number_of_training_iterations; r++)
        {
            let output = this.think(training_set_inputs);
            let error = VectorOps.Operate(training_set_outputs, '-', output);
            let adjustment = dot(training_set_inputs.transpose(), VectorOps.Operate(error, '*', this.__sigmoid_derivative(output)))
            this.synaptic_weights = VectorOps.Operate(this.synaptic_weights, '+', adjustment);
        }
    }

    public think(inputs: any[])
    {
        return this.__sigmoid(dot(inputs, this.synaptic_weights));
    }
}
