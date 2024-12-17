import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Üdvözöljük, {user?.email}!
            </h1>
            <Button
              onClick={signOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Kijelentkezés
            </Button>
          </div>
          
          {/* Itt jelennek majd meg a felhasználó névjegykártyái */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">
              A névjegykártyáid hamarosan itt jelennek meg...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;