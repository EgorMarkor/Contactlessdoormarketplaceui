import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  completed: boolean;
}

interface ConfiguratorStepperProps {
  currentStep: number;
  steps: Step[];
  onStepClick: (step: number) => void;
}

export function ConfiguratorStepper({ currentStep, steps, onStepClick }: ConfiguratorStepperProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => onStepClick(step.id)}
              disabled={step.id > currentStep && !step.completed}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all ${
                step.id === currentStep
                  ? 'bg-accent text-accent-foreground ring-4 ring-accent/20'
                  : step.completed
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-muted-foreground'
              } ${step.id <= currentStep || step.completed ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-50'}`}
            >
              {step.completed ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <span className="text-xs sm:text-sm">{step.id}</span>
              )}
            </button>
            
            <div className="flex-1 ml-2 sm:ml-3">
              <div className={`text-xs sm:text-sm ${
                step.id === currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className={`h-0.5 sm:h-1 flex-1 mx-2 sm:mx-3 rounded-full transition-all ${
                step.completed ? 'bg-accent' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
