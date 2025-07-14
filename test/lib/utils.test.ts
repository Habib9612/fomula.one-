import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn function', () => {
    it('should combine class names correctly', () => {
      const result = cn('base-class', 'additional-class');
      expect(result).toBe('base-class additional-class');
    });

    it('should handle conditional class names', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
      expect(result).toBe('base-class conditional-class');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class');
      expect(result).toBe('base-class valid-class');
    });

    it('should handle arrays of class names', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle objects with boolean values', () => {
      const result = cn({
        'active': true,
        'disabled': false,
        'visible': true
      });
      expect(result).toBe('active visible');
    });

    it('should handle mixed input types', () => {
      const result = cn(
        'base',
        ['array-class1', 'array-class2'],
        { 'object-class': true, 'hidden': false },
        'string-class',
        undefined,
        null
      );
      expect(result).toBe('base array-class1 array-class2 object-class string-class');
    });

    it('should handle Tailwind class conflicts and merge them correctly', () => {
      // Testing tailwind-merge functionality
      const result = cn('px-2', 'px-4'); // Should merge to px-4
      expect(result).toBe('px-4');
    });

    it('should handle complex Tailwind class combinations', () => {
      const result = cn(
        'bg-red-500',
        'bg-blue-500', // Should override red
        'p-2',
        'px-4', // Should override p-2 for x-axis
        'text-white'
      );
      expect(result).toBe('bg-blue-500 py-2 px-4 text-white');
    });

    it('should handle empty strings and whitespace', () => {
      const result = cn('', '   ', 'valid-class', '', 'another-class');
      expect(result).toBe('valid-class another-class');
    });

    it('should handle boolean expressions', () => {
      const isActive = true;
      const isDisabled = false;
      const size = 'lg';
      
      const result = cn(
        'btn',
        isActive && 'btn-active',
        isDisabled && 'btn-disabled',
        size === 'lg' && 'btn-lg'
      );
      
      expect(result).toBe('btn btn-active btn-lg');
    });

    it('should handle nested arrays and objects', () => {
      const result = cn(
        'base',
        [
          'array-class',
          { 'nested-object': true, 'nested-false': false }
        ],
        {
          'object-class': true,
          'object-array': ['nested-array-class']
        }
      );
      expect(result).toContain('base');
      expect(result).toContain('array-class');
      expect(result).toContain('nested-object');
      expect(result).toContain('object-class');
      expect(result).not.toContain('nested-false');
    });

    it('should handle numeric values', () => {
      const result = cn('base', 0, 1, 'valid');
      expect(result).toBe('base 1 valid');
    });

    it('should handle component styling patterns', () => {
      const variant = 'primary';
      const size = 'md';
      const disabled = false;
      
      const result = cn(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-sm': size === 'sm',
          'btn-md': size === 'md',
          'btn-lg': size === 'lg',
          'btn-disabled': disabled
        }
      );
      
      expect(result).toBe('btn btn-primary btn-md');
    });
  });
});
