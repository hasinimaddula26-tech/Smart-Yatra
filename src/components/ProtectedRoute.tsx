import React from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // Bypassed check completely so the user can access any page without logging in
    return <>{children}</>;
}
