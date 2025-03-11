'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function UpgradePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Upgrade Your Plan</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Free</h2>
          <p className="text-3xl font-bold">$0<span className="text-sm font-normal">/month</span></p>
          <ul className="space-y-2">
            <li>✓ 5 mock interviews/month</li>
            <li>✓ Basic feedback</li>
            <li>✓ Limited question bank</li>
          </ul>
          <Button className="w-full" variant="outline">Current Plan</Button>
        </div>

        {/* Pro Plan */}
        <div className="border rounded-lg p-6 space-y-4 bg-primary/5 ring-2 ring-primary">
          <h2 className="text-2xl font-bold">Pro</h2>
          <p className="text-3xl font-bold">$19<span className="text-sm font-normal">/month</span></p>
          <ul className="space-y-2">
            <li>✓ Unlimited mock interviews</li>
            <li>✓ Advanced AI feedback</li>
            <li>✓ Full question bank</li>
            <li>✓ Custom interview scenarios</li>
          </ul>
          <Button className="w-full">Upgrade to Pro</Button>
        </div>

        {/* Enterprise Plan */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Enterprise</h2>
          <p className="text-3xl font-bold">$99<span className="text-sm font-normal">/month</span></p>
          <ul className="space-y-2">
            <li>✓ Everything in Pro</li>
            <li>✓ Team management</li>
            <li>✓ Custom branding</li>
            <li>✓ Priority support</li>
          </ul>
          <Button className="w-full" variant="outline">Contact Sales</Button>
        </div>
      </div>
    </div>
  );
}