function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = {
        daysExcludingFridays: [],
        daysWorkedExcludingFridays: [],
        monthlyTargets: [],
        totalTarget: 0
    };

    let current = new Date(start);
    let monthlyDays = {};
    let totalDays = 0;

    // Calculate total working days per month excluding Fridays
    while (current <= end) {
        const monthKey = `${current.getFullYear()}-${current.getMonth() + 1}`;
        if (current.getDay() !== 5) {  // Exclude Fridays
            monthlyDays[monthKey] = (monthlyDays[monthKey] || 0) + 1;
            totalDays++;
        }
        current.setDate(current.getDate() + 1);
    }

    // Process each month in the range
    for (const [monthKey, days] of Object.entries(monthlyDays)) {
        result.daysExcludingFridays.push(days);
        result.daysWorkedExcludingFridays.push(days);

        // Proportional monthly target
        const monthlyTarget = (days / totalDays) * totalAnnualTarget;
        result.monthlyTargets.push(monthlyTarget);
    }

    // Calculate total target based on working days
    result.totalTarget = result.monthlyTargets.reduce((acc, val) => acc + val, 0);

    return result;
}

// Example usage:
const output = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(output);
