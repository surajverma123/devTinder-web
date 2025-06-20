import { Eye, Users, Mail, Heart, ArrowUp, ArrowDown } from "lucide-react";
const iconMap = {
	eye: Eye,
	users: Users,
	mail: Mail,
	heart: Heart
};
const StatCard = ({ title, value, change, trend, icon, borderColor }) => {
	const IconComponent = iconMap[icon];

	return (
		<div className={`bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 border-l-4 border-${borderColor}`}>
			<div className="flex items-start justify-between">
				<div>
					<p className="text-medium-gray text-sm">{title}</p>
					<h3 className="text-2xl font-bold text-dark">{value}</h3>
					<p className={`${trend === 'up' ? 'text-success' : 'text-destructive'} text-xs flex items-center`}>
						{trend === 'up' ? (
							<ArrowUp className="mr-1 w-3 h-3" />
						) : (
							<ArrowDown className="mr-1 w-3 h-3" />
						)}
						{change}
					</p>
				</div>
				<div className={`w-10 h-10 rounded-lg bg-${borderColor} bg-opacity-10 flex items-center justify-center`}>
					<IconComponent className={`text-${borderColor}`} />
				</div>
			</div>
		</div>
	);
};

export default StatCard;
