
const DashboardHeading = ({ title, description }) => {
    return (
        <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-extrabold text-slate-950">
                {title}
            </h1>
            <p className="text-slate-600 text-sm mt-1">
                {description}
            </p>
        </div>
    );
};

export default DashboardHeading;