<!--

@license Apache-2.0

Copyright (c) 2026 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# dcopyWithin

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Perform an in-place copy of elements within a double-precision floating-point strided array.

<section class="installation">

## Installation

```bash
npm install @stdlib/blas-ext-base-dcopy-within
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var dcopyWithin = require( '@stdlib/blas-ext-base-dcopy-within' );
```

#### dcopyWithin( N, target, start, end, x, strideX, workspace, strideW )

Performs an in-place copy of elements within a double-precision floating-point strided array.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );
var w = new Float64Array( x.length );

dcopyWithin( x.length, 3, 1, 4, x, 1, w, 1 );
// x => <Float64Array>[ 1.0, 2.0, 3.0, 2.0, 3.0, 4.0 ]
```

The function has the following parameters:

-   **N**: number of indexed elements.
-   **target**: target index.
-   **start**: source start index (inclusive).
-   **end**: source end index (exclusive).
-   **x**: input [`Float64Array`][@stdlib/array/float64].
-   **strideX**: stride length for `x`.
-   **workspace**: workspace [`Float64Array`][@stdlib/array/float64]. Must have at least `N` indexed elements.
-   **strideW**: stride length for `workspace`.

The `N` and stride parameters determine which elements in the strided array are accessed at runtime. For example, to copy every other element:

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, 0.0, 3.0, 0.0, 5.0, 0.0, 7.0, 0.0 ] );
var w = new Float64Array( 3 );

dcopyWithin( 3, 0, 1, 6, x, 2, w, 1 );
// x => <Float64Array>[ 3.0, 0.0, 5.0, 0.0, 5.0, 0.0, 7.0, 0.0 ]
```

Note that indexing is relative to the first index. To introduce an offset, use [`typed array`][mdn-typed-array] views.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

// Initial array...
var x0 = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );

// Create an offset view...
var x1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element

// Create a workspace array...
var w = new Float64Array( 6 );

// Copy within the view...
dcopyWithin( 6, 0, 3, 6, x1, 1, w, 1 );
// x0 => <Float64Array>[ 1.0, 5.0, 6.0, 7.0, 5.0, 6.0, 7.0, 8.0 ]
```

<!-- lint disable maximum-heading-length -->

#### dcopyWithin.ndarray( N, target, start, end, x, strideX, offsetX, workspace, strideW, offsetW )

Performs an in-place copy of elements within a double-precision floating-point strided array using alternative indexing semantics.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );
var w = new Float64Array( x.length );

dcopyWithin.ndarray( x.length, 3, 1, 4, x, 1, 0, w, 1, 0 );
// x => <Float64Array>[ 1.0, 2.0, 3.0, 2.0, 3.0, 4.0 ]
```

The function has the following additional parameters:

-   **offsetX**: starting index for `x`.
-   **offsetW**: starting index for `workspace`.

While [`typed array`][mdn-typed-array] views mandate a view offset based on the underlying buffer, the offset parameters support indexing semantics based on starting indices. For example, to copy elements starting from the third element:

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
var w = new Float64Array( 4 );

dcopyWithin.ndarray( 4, 2, 0, 2, x, 1, 2, w, 1, 0 );
// x => <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 3.0, 4.0, 7.0, 8.0 ]
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   If `N <= 0`, both functions return the strided array unchanged.
-   If `target >= N`, both functions return the strided array unchanged.
-   If `start >= end`, both functions return the strided array unchanged.
-   If the `start` and `target` index ranges do not overlap, the `workspace` array is unused and thus ignored.
-   Both functions **mutate** the provided input strided array.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var discreteUniform = require( '@stdlib/random-array-discrete-uniform' );
var zeros = require( '@stdlib/array-zeros' );
var dcopyWithin = require( '@stdlib/blas-ext-base-dcopy-within' );

var x = discreteUniform( 10, 0, 500, {
    'dtype': 'float64'
});
console.log( x );

var w = zeros( 10, 'float64' );

// Copy the first 3 elements to positions 5, 6, 7:
dcopyWithin( 10, 5, 0, 3, x, 1, w, 1 );
console.log( x );
```

</section>

<!-- /.examples -->

<!-- C interface documentation. -->

* * *

<section class="c">

## C APIs

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- C usage documentation. -->

<section class="usage">

### Usage

```c
#include "stdlib/blas/ext/base/dcopy_within.h"
```

#### stdlib_strided_dcopy_within( N, target, start, end, \*X, strideX, \*W, strideW )

Performs an in-place copy of elements within a double-precision floating-point strided array.

```c
double x[] = { 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 };
double w[ 6 ];

stdlib_strided_dcopy_within( 6, 3, 1, 4, x, 1, w, 1 );
```

The function accepts the following arguments:

-   **N**: `[in] CBLAS_INT` number of indexed elements.
-   **target**: `[in] CBLAS_INT` target index.
-   **start**: `[in] CBLAS_INT` source start index (inclusive).
-   **end**: `[in] CBLAS_INT` source end index (exclusive).
-   **X**: `[inout] double*` input array.
-   **strideX**: `[in] CBLAS_INT` stride length for `X`.
-   **W**: `[out] double*` workspace array. Must have at least `N` indexed elements.
-   **strideW**: `[in] CBLAS_INT` stride length for `W`.

```c
void stdlib_strided_dcopy_within( const CBLAS_INT N, const CBLAS_INT target, const CBLAS_INT start, const CBLAS_INT end, double *X, const CBLAS_INT strideX, double *W, const CBLAS_INT strideW );
```

#### stdlib_strided_dcopy_within_ndarray( N, target, start, end, \*X, strideX, offsetX, \*W, strideW, offsetW )

Performs an in-place copy of elements within a double-precision floating-point strided array using alternative indexing semantics.

```c
double x[] = { 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 };
double w[ 6 ];

stdlib_strided_dcopy_within_ndarray( 4, 2, 0, 2, x, 1, 1, w, 1, 0 );
```

The function accepts the following arguments:

-   **N**: `[in] CBLAS_INT` number of indexed elements.
-   **target**: `[in] CBLAS_INT` target index.
-   **start**: `[in] CBLAS_INT` source start index (inclusive).
-   **end**: `[in] CBLAS_INT` source end index (exclusive).
-   **X**: `[inout] double*` input array.
-   **strideX**: `[in] CBLAS_INT` stride length for `X`.
-   **offsetX**: `[in] CBLAS_INT` starting index for `X`.
-   **W**: `[out] double*` workspace array. Must have at least `N` indexed elements.
-   **strideW**: `[in] CBLAS_INT` stride length for `W`.
-   **offsetW**: `[in] CBLAS_INT` starting index for `W`.

```c
void stdlib_strided_dcopy_within_ndarray( const CBLAS_INT N, const CBLAS_INT target, const CBLAS_INT start, const CBLAS_INT end, double *X, const CBLAS_INT strideX, const CBLAS_INT offsetX, double *W, const CBLAS_INT strideW, const CBLAS_INT offsetW );
```

</section>

<!-- /.usage -->

<!-- C API usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- C API usage examples. -->

<section class="examples">

### Examples

```c
#include "stdlib/blas/ext/base/dcopy_within.h"
#include <stdio.h>

int main( void ) {
    // Create a strided array:
    double x[] = { 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 };

    // Create a workspace array:
    double w[ 8 ];

    // Specify the number of indexed elements:
    const int N = 8;

    // Specify strides:
    const int strideX = 1;
    const int strideW = 1;

    // Copy elements:
    stdlib_strided_dcopy_within( N, 4, 1, 4, x, strideX, w, strideW );

    // Print the result:
    for ( int i = 0; i < 8; i++ ) {
        printf( "x[ %i ] = %lf\n", i, x[ i ] );
    }
}
```

</section>

<!-- /.examples -->

</section>

<!-- /.c -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2026. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/blas-ext-base-dcopy-within.svg
[npm-url]: https://npmjs.org/package/@stdlib/blas-ext-base-dcopy-within

[test-image]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/blas-ext-base-dcopy-within/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/blas-ext-base-dcopy-within?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/blas-ext-base-dcopy-within.svg
[dependencies-url]: https://david-dm.org/stdlib-js/blas-ext-base-dcopy-within/main

-->

[chat-image]: https://img.shields.io/badge/zulip-join_chat-brightgreen.svg
[chat-url]: https://stdlib.zulipchat.com

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/tree/deno
[deno-readme]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/tree/umd
[umd-readme]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/tree/esm
[esm-readme]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/blas-ext-base-dcopy-within/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/blas-ext-base-dcopy-within/main/LICENSE

[@stdlib/array/float64]: https://github.com/stdlib-js/array-float64

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

<!-- <related-links> -->

<!-- </related-links> -->

</section>

<!-- /.links -->
