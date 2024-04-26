import { FC, ReactNode } from "react";


const AuthLayout: FC<{children: ReactNode}> = ({ children }) => {
    return (
        <div className="bg-slate-200 p-4 h-full">
            {children}
        </div>
    );
}

export default AuthLayout;