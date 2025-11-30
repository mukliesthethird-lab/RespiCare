import { userDb } from './db';

/**
 * Utility function to promote a user to admin role
 * Usage: 
 * 1. Import this file in a Node script or API route
 * 2. Call promoteToAdmin with the user's email
 * 
 * Example in Node REPL:
 * ```
 * const { promoteToAdmin } = require('./lib/promoteAdmin');
 * promoteToAdmin('user@example.com');
 * ```
 */

export function promoteToAdmin(email: string) {
    try {
        const user = userDb.findByEmail(email);

        if (!user) {
            console.error(`❌ User not found with email: ${email}`);
            return false;
        }

        if (user.role === 'admin') {
            console.log(`ℹ️  User ${email} is already an admin`);
            return true;
        }

        userDb.setRole(user.id, 'admin');
        console.log(`✅ Successfully promoted ${email} to admin role`);
        return true;
    } catch (error) {
        console.error('❌ Error promoting user:', error);
        return false;
    }
}

export function demoteFromAdmin(email: string) {
    try {
        const user = userDb.findByEmail(email);

        if (!user) {
            console.error(`❌ User not found with email: ${email}`);
            return false;
        }

        if (user.role === 'user') {
            console.log(`ℹ️  User ${email} is already a regular user`);
            return true;
        }

        userDb.setRole(user.id, 'user');
        console.log(`✅ Successfully demoted ${email} to user role`);
        return true;
    } catch (error) {
        console.error('❌ Error demoting user:', error);
        return false;
    }
}

// If run directly (for testing)
if (require.main === module) {
    const email = process.argv[2];

    if (!email) {
        console.log('Usage: ts-node lib/promoteAdmin.ts <email>');
        process.exit(1);
    }

    promoteToAdmin(email);
}
