"use client"

import React, { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ColorSchemeSelector() {
    const { colorScheme, setColorScheme, colorSchemes, addColorScheme } = useTheme()
    const [newScheme, setNewScheme] = useState({
        name: '',
        primary: '#0089c1',
        secondary: '#3982c3',
        accent: '#ffffff',
        background: '#ffffff',
        text: '#000000'
    })

    const handleNewSchemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewScheme({ ...newScheme, [e.target.name]: e.target.value })
    }

    const handleAddNewScheme = () => {
        addColorScheme(newScheme)
        setColorScheme(newScheme)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="text-[#3982c3] border-white hover:bg-primary-foreground/10">Change Color Scheme</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <Tabs defaultValue="preset">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="preset">Preset Schemes</TabsTrigger>
                        <TabsTrigger value="custom">Custom Scheme</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preset">
                        <div className="grid gap-4">
                            {colorSchemes.map((scheme) => (
                                <Button
                                    key={scheme.name}
                                    onClick={() => setColorScheme(scheme)}
                                    className="w-full justify-start"
                                    style={{
                                        backgroundColor: scheme.primary,
                                        color: scheme.accent,
                                    }}
                                >
                                    {scheme.name}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="custom">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={newScheme.name}
                                    onChange={handleNewSchemeChange}
                                    className="col-span-2"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="primary">Primary</Label>
                                <Input
                                    id="primary"
                                    name="primary"
                                    type="color"
                                    value={newScheme.primary}
                                    onChange={handleNewSchemeChange}
                                />
                                <Input
                                    value={newScheme.primary}
                                    onChange={handleNewSchemeChange}
                                    name="primary"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="secondary">Secondary</Label>
                                <Input
                                    id="secondary"
                                    name="secondary"
                                    type="color"
                                    value={newScheme.secondary}
                                    onChange={handleNewSchemeChange}
                                />
                                <Input
                                    value={newScheme.secondary}
                                    onChange={handleNewSchemeChange}
                                    name="secondary"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="accent">Accent</Label>
                                <Input
                                    id="accent"
                                    name="accent"
                                    type="color"
                                    value={newScheme.accent}
                                    onChange={handleNewSchemeChange}
                                />
                                <Input
                                    value={newScheme.accent}
                                    onChange={handleNewSchemeChange}
                                    name="accent"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="background">Background</Label>
                                <Input
                                    id="background"
                                    name="background"
                                    type="color"
                                    value={newScheme.background}
                                    onChange={handleNewSchemeChange}
                                />
                                <Input
                                    value={newScheme.background}
                                    onChange={handleNewSchemeChange}
                                    name="background"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="text">Text</Label>
                                <Input
                                    id="text"
                                    name="text"
                                    type="color"
                                    value={newScheme.text}
                                    onChange={handleNewSchemeChange}
                                />
                                <Input
                                    value={newScheme.text}
                                    onChange={handleNewSchemeChange}
                                    name="text"
                                />
                            </div>
                            <Button onClick={handleAddNewScheme}>Add and Apply Scheme</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}

