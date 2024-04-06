export default function getNextTarget(currentTarget: string): string {
	const currentNumber = currentTarget.split('_')[1];
	const newNumber = Number(currentNumber) + 1;
	return `screen_${newNumber}`;
}
