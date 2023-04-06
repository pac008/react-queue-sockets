import { type FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { DesktopPage } from '../pages/desktop';
import { QueuePage } from '../pages/queue';
import { LoginPage } from '../pages/login';
import TicketPage from '../pages/ticket';
import { LayoutQueue } from '../layout';

export const RouterPage: FC = () => {
  return (
    <LayoutQueue>
      <Routes>
        <Route path='/ingresar' element={<LoginPage />} />
        <Route path='/escritorio' element={<DesktopPage />} />
        <Route path='/cola' element={<QueuePage />} />
        <Route path='/crear' element={<TicketPage />} />
        <Route path='/' element={<Navigate to='/ingresar' />} />
      </Routes>
    </LayoutQueue>
  );
};
