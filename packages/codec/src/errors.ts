/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Centralized error message formatting utilities.
 */

export function err(msg: string): string {
  return msg;
}

export function errField(path: string, msg: string): string {
  return `${path}: ${msg}`;
}

export function errExpected(path: string, expected: string, got: unknown): string {
  return `${path}: expected ${expected}, got ${JSON.stringify(got)}`;
}

export function errMissing(path: string): string {
  return `${path}: is required`;
}

export function errInvalid(path: string): string {
  return `${path}: is invalid`;
}

export function errType(path: string, type: string, got: unknown): string {
  return `${path}: must be ${type}, got ${JSON.stringify(got)}`;
}

export function errEnum(path: string, allowed: string[], got: unknown): string {
  return `${path}: must be one of ${JSON.stringify(allowed)}, got ${JSON.stringify(got)}`;
}