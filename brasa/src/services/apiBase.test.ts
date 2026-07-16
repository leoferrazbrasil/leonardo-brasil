import { describe, expect, it } from 'vitest';
import { resolveDefaultApiBase } from './apiBase';

describe('resolveDefaultApiBase', () => {
  it('uses the root domain API when Brasa runs on the subdomain', () => {
    expect(resolveDefaultApiBase('brasa.leonardobrasil.com.br')).toBe('https://leonardobrasil.com.br');
  });

  it('keeps API calls relative on localhost and the root domain', () => {
    expect(resolveDefaultApiBase('localhost')).toBe('');
    expect(resolveDefaultApiBase('leonardobrasil.com.br')).toBe('');
  });
});
