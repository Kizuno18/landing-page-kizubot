"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ConfigItem = ({ title, description, children }: { title: string; description: string | React.ReactNode; children?: React.ReactNode }) => (
    <Card className="bg-card/50">
        <CardHeader>
            <CardTitle className="text-xl text-foreground"><code>{title}</code></CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        {children && (
            <CardContent className="space-y-3 text-muted-foreground pt-0">
                <hr className="border-border my-2" />
                {children}
            </CardContent>
        )}
    </Card>
);
