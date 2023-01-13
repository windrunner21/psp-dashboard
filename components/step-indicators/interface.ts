interface StepIndicatorsProps {
  position: "absolute" | "fixed";
  type: "circle" | "line";
  totalSteps?: number;
  step: number;
  completedStep: number;
}

export default StepIndicatorsProps;
