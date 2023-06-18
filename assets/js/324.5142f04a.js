(window.webpackJsonp=window.webpackJsonp||[]).push([[324],{618:function(a,s,t){"use strict";t.r(s);var e=t(10),n=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"build-instructions-for-atomicdex-desktop"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#build-instructions-for-atomicdex-desktop"}},[a._v("#")]),a._v(" Build Instructions for AtomicDEX Desktop")]),a._v(" "),s("h2",{attrs:{id:"ubuntu-16-04"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu-16-04"}},[a._v("#")]),a._v(" Ubuntu 16.04")]),a._v(" "),s("h3",{attrs:{id:"dependencies"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dependencies"}},[a._v("#")]),a._v(" Dependencies")]),a._v(" "),s("ul",[s("li",[a._v("Install the Open Source version of QT from here: "),s("a",{attrs:{href:"https://www.qt.io/download",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://www.qt.io/download"),s("OutboundLink")],1),a._v(". You might need to create an account 😦\n"),s("ul",[s("li",[a._v("You will be prompted to selected the version of QT software to install. Choose the latest version and note its number (Example: "),s("code",[a._v("5.14.1")]),a._v(")")]),a._v(" "),s("li",[a._v("Add the following environment variables to your "),s("code",[a._v("~/.bashrc")]),a._v(" or "),s("code",[a._v("~/.zshrc")]),a._v(" files")])])])]),a._v(" "),s("p",[a._v("Example:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("QT_INSTALL_CMAKE_PATH")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=~")]),a._v("/Qt/5.14.0/gcc/lib/cmake "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# QT_INSTALL_CMAKE_PATH equal to the CMake QT path")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("QT_ROOT")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=~")]),a._v("/Qt/5.14.0 "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# QT_ROOT equal to the QT root installation folder")]),a._v("\n")])])]),s("p",[a._v("or")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("QT_INSTALL_CMAKE_PATH")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=~")]),a._v("/Qt/5.14.1/gcc_64/lib/cmake/\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("QT_ROOT")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=~")]),a._v("/Qt/5.14.1\n")])])]),s("p",[a._v("You have to look at your QT installation and set the above variables. It changes based on version/system architecture etc.,")]),a._v(" "),s("ul",[s("li",[a._v("Install the latest version of "),s("a",{attrs:{href:"https://cmake.org/download/",target:"_blank",rel:"noopener noreferrer"}},[a._v("CMake"),s("OutboundLink")],1),a._v(" (3.14 minimum)")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt")]),a._v(" purge --auto-remove cmake\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" ~\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" https://github.com/Kitware/CMake/releases/download/v3.16.5/cmake-3.16.5-Linux-x86_64.sh\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("chmod")]),a._v(" +x cmake-3.16.5-Linux-x86_64.sh\n./cmake-3.16.5-Linux-x86_64.sh\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ln")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-s")]),a._v(" ~/cmake-3.16.5-Linux-x86_64/bin/cmake /usr/local/bin/cmake\n")])])]),s("ul",[s("li",[a._v("Install "),s("code",[a._v("gcc-9")]),a._v(" and "),s("code",[a._v("g++-9")])])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" add-apt-repository ppa:jonathonf/gcc-9.0\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" update\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" gcc-9 g++-9\n")])])]),a._v(" "),s("ul",[s("li",[a._v("Install the latest version of "),s("code",[a._v("clang")]),a._v(" (clang-8 minimum) and related tools")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" https://apt.llvm.org/llvm.sh\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("chmod")]),a._v(" +x llvm.sh\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" ./llvm.sh "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("9")]),a._v("\n")])])]),s("p",[a._v("Set the recently installed clang version to be used")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" update-alternatives "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--install")]),a._v(" /usr/bin/clang++ clang++ /usr/bin/clang++-9 "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("100")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" update-alternatives "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--install")]),a._v(" /usr/bin/clang clang /usr/bin/clang-9 "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("100")]),a._v("\n")])])]),s("ul",[s("li",[a._v("Install the latest version of "),s("code",[a._v("nim")]),a._v(" and its tools")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" https://nim-lang.org/choosenim/init.sh "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-sSf")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sh")]),a._v("\n")])])]),s("p",[a._v("Take note of the response and follow the instructions there to add a string similar to "),s("code",[a._v("export PATH=/home/<username>/.nimble/bin:$PATH")]),a._v(" to the end of your "),s("code",[a._v("~/.bashrc")]),a._v(" or "),s("code",[a._v("~/.zshrc")]),a._v(" files")]),a._v(" "),s("ul",[s("li",[a._v("Install other dependencies")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-y")]),a._v(" ninja-build "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v("\n")])])]),s("ul",[s("li",[a._v("Install "),s("code",[a._v("libwally")])])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" clone https://github.com/KomodoPlatform/libwally-core.git\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" libwally-core\n./tools/autogen.sh\n./configure --disable-shared\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("make")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-j2")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v("\n")])])]),s("h3",{attrs:{id:"clone-and-build"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#clone-and-build"}},[a._v("#")]),a._v(" Clone and Build")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" clone https://github.com/KomodoPlatform/atomicDEX-Pro\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" atomicDEX-Pro/ci_tools_atomic_dex\nnimble build\n./ci_tools_atomic_dex build debug  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# debug version")]),a._v("\n./ci_tools_atomic_dex build release "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# release version")]),a._v("\n")])])]),s("ul",[s("li",[a._v("The last line of the build output in your terminal gives the compiled executable's location")]),a._v(" "),s("li",[a._v("If debug version was built, it will be found in the "),s("code",[a._v("build-Debug/")]),a._v(" directory")]),a._v(" "),s("li",[a._v("If release version was built, it will be found in the "),s("code",[a._v("build-Release/")]),a._v(" directory")])]),a._v(" "),s("p",[a._v("Example:")]),a._v(" "),s("p",[a._v("The location of the built executable for debug version can be in")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("build-Debug/bin/AntaraAtomicDexAppDir/usr/bin\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);