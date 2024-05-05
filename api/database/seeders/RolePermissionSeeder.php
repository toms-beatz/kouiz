<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Création de permissions
        $permissions = [
            'edit users',
            'delete users',
            'create users',
            'view users',
            'edit own profile',
            'view own profile',
            'delete own profile',
            'edit roles',
            'delete roles',
            'create roles',
            'view roles',
            'edit permissions',
            'delete permissions',
            'create permissions',
            'view permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Création du rôle 'super admin' et assignation de toutes les permissions
        $roleSuperAdmin = Role::create(['name' => 'super admin']);
        $roleSuperAdmin->givePermissionTo(Permission::all());

        // Création du rôle 'admin' et assignation des permissions (sauf 'delete users')
        $roleAdmin = Role::create(['name' => 'admin']);
        $roleAdmin->givePermissionTo(['edit own profile', 'view own profile', 'delete own profile']);

        // Création du rôle 'user' et assignation de la permission de gestion de son propre profil
        $roleUser = Role::create(['name' => 'user']);
        $roleUser->givePermissionTo(['edit own profile', 'view own profile', 'delete own profile']);

        // Assignation des rôles aux utilisateurs
        $user = \App\Models\User::find(1); 
        if ($user) {
            $user->assignRole('admin');
        } 
        


    }
}