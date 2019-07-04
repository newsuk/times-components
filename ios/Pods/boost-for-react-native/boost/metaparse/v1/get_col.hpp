#ifndef BOOST_METAPARSE_V1_GET_COL_HPP
#define BOOST_METAPARSE_V1_GET_COL_HPP

//    Copyright Abel Sinkovics (abel@sinkovics.hu) 2011.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE_1_0.txt or copy at
//          http://www.boost.org/LICENSE_1_0.txt)

#include <boost/metaparse/v1/fwd/get_col.hpp>

namespace boost
{
  namespace metaparse
  {
    namespace v1
    {
      template <class>
      struct get_col_impl;

      template <class T>
      struct get_col : get_col_impl<typename T::type::tag>::template apply<typename T::type>
      {};

    }
  }
}

#endif

