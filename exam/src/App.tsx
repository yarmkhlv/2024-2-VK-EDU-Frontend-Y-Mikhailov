import { HashRouter, Routes, Route } from 'react-router-dom';

import { TranslatorPage } from './pages/TranslatorPage';
import { HistoryPage } from './pages/HistoryPage';
import { PAGES } from './utils/variables';
import { Layout } from './components/Layout';

function App() {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route
                        path={PAGES.TRANSLATOR}
                        element={<TranslatorPage />}
                    />
                    <Route path={PAGES.HISTORY} element={<HistoryPage />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
}

export default App;
