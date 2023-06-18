(window.webpackJsonp=window.webpackJsonp||[]).push([[225],{519:function(a,t,e){"use strict";e.r(t);var s=e(10),o=Object(s.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"running-komodo-software-in-debug-mode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#running-komodo-software-in-debug-mode"}},[a._v("#")]),a._v(" Running Komodo Software in Debug Mode")]),a._v(" "),t("h2",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[a._v("#")]),a._v(" Introduction")]),a._v(" "),t("p",[a._v("To run Komodo software in debug mode, follow these steps.")]),a._v(" "),t("h2",{attrs:{id:"install-gdb"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#install-gdb"}},[a._v("#")]),a._v(" Install gdb")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" gdb\n")])])]),t("h2",{attrs:{id:"run-komodo-daemon-with-gdb-tool"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#run-komodo-daemon-with-gdb-tool"}},[a._v("#")]),a._v(" Run Komodo Daemon With "),t("code",[a._v("gdb")]),a._v(" Tool")]),a._v(" "),t("p",[a._v("Initiate your daemon using with "),t("code",[a._v("gdb -args")]),a._v(" as a prefix.")]),a._v(" "),t("p",[a._v("For example, the below command would initiate the Komodod daemon with mining active and a designated pubkey.")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("gdb "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-args")]),a._v(" ./src/komodod "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-gen")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-genproclimit")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-pubkey")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"03af2412ebf9517a43d192193490476fd0a44312c70755e07eb03b6d71338ebc9d"')]),a._v("\n")])])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("If you are having trouble initiating komodod in the shell, try use the absolute path to komodod. For example, "),t("b",[a._v("/home/$USERNAME/komodo/src/komodod")])])]),a._v(" "),t("p",[a._v("The shell should return the following prompt.")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("gdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("p",[a._v("Execute "),t("code",[a._v("run")]),a._v(" in the shell to start Komodo in debug mode.")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("gdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" run\n")])])]),t("h2",{attrs:{id:"retrieving-backtrace-data"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#retrieving-backtrace-data"}},[a._v("#")]),a._v(" Retrieving Backtrace Data")]),a._v(" "),t("p",[a._v("Whenever komodod crashes, you will again see "),t("code",[a._v("gdb>")]),a._v(" as a prompt.")]),a._v(" "),t("p",[a._v("To recall the last stages of komodod before the crash, execute the following command.")]),a._v(" "),t("h5",{attrs:{id:"command"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#command"}},[a._v("#")]),a._v(" Command")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("gdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" backtrace\n")])])]),t("p",[a._v("The returned data can be shared with any Komodo developer to assist in troubleshooting Komodo development.")]),a._v(" "),t("p",[a._v("Select and highlight all relevant data using the cursor, and then use "),t("code",[a._v("CTRL + SHIFT + C")]),a._v(" to copy to the clipboard.")])])}),[],!1,null,null,null);t.default=o.exports}}]);