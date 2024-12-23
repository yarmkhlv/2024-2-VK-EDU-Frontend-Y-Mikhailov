import { Header } from '../widgets/Header';

interface ILayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
        </>
    );
};
