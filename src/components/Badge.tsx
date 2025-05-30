interface BadgeProps {
  children: React.ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <div className="bg-white rounded-[4px] absolute top-9 left-9 px-3 py-2 text-primary-600 border-primary-200 border-[0.5px]">
      {children}
    </div>
  );
};

export default Badge;
