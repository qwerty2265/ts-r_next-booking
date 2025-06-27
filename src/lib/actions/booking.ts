'use server'

import { db } from '@/lib/db';
import { getCurrentUser } from './auth';
import { revalidatePath } from 'next/cache';

export async function createBooking(title: string, subtitle: string, start: Date, end: Date) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('Unauthorized');
    }

    const booking = await db.booking.create({
      data: {
        title,
        subtitle,
        start,
        end,
        userId: user.id,
      }
    });

    revalidatePath('/dashboard');
    return { success: true, booking };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
}

export async function getUserBookings(userId: string) {
  try {
    const bookings = await db.booking.findMany({
      where: { userId },
      orderBy: { start: 'asc' }
    });
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

export async function deleteBooking(id: string) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('Unauthorized');
    }

    const booking = await db.booking.findFirst({
      where: { 
        id,
        userId: user.id 
      }
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    await db.booking.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw new Error('Failed to delete booking');
  }
}