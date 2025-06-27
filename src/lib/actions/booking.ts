'use server'

import { db } from '@/lib/db';
import { getCurrentUser } from './auth';
import { revalidatePath } from 'next/cache';

export async function createBooking(title: string, start: Date, end: Date, subtitle?: string) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('Unauthorized');
    }

    const booking = await db.booking.create({
      data: {
        title,
        subtitle: subtitle || '',
        start,
        end,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    revalidatePath('/');
    return { success: true, booking };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function getAllBookings() {
  try {
    const bookings = await db.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { start: 'asc' }
    });

    return bookings;
  } catch (error) {
    console.error('Error getting all bookings:', error);
    return [];
  }
}

export async function getUserBookings() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return [];
    }

    const bookings = await db.booking.findMany({
      where: { userId: user.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { start: 'asc' }
    });

    return bookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
}

export async function updateBooking(id: string, title: string, start: Date, end: Date, subtitle?: string) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('Unauthorized');
    }

    const booking = await db.booking.update({
      where: { 
        id,
        userId: user.id, 
      },
      data: { title, subtitle, start, end },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    revalidatePath('/');
    return { success: true, booking };
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
}

export async function deleteBooking(id: string) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('Unauthorized');
    }

    await db.booking.delete({
      where: { 
        id,
        userId: user.id,
      }
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
}