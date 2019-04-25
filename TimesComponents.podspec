# coding: utf-8
require 'json'

package = JSON.parse(File.read("./ios-app/package.json"))

podspec_version = package["version"]
react_native_version = package["dependencies"]["react-native"]

Pod::Spec.new do |s|
  s.name         = "TimesComponents"
  # s.version      = podspec_version
  s.version      = '1.20.300'
  s.summary      = "Times iOS React components"
  s.description  = "All the things for Times iOS React components including dependencies"
  s.homepage     = "https://www.news.co.uk"
  s.license      = { type: 'MIT', file: 'LICENSE' }
  s.author       = "News UK"
  s.platform     = :ios, '9.0'

  s.source       = { :git => 'https://github.com/newsuk/times-components.git', :tag => "#{s.version}"}
  # s.source       = { :git => 'https://github.com/newsuk/times-components.git', :branch => "feature/rn-ios-pod-setup"}
  # s.source_files   = 'ios-app/Classes/**/*.{h,m}'
  # s.preserve_paths = 'Pod/Classes/**/*.generated.objc'
  s.resources      = ['ios-app/ios-assets/js/index.ios.bundle', 'ios-app/ios-assets/res/*']
  # s.resources      = ['ios-app/ios-assets/js/*']
  # s.resource_bundles = {'TimesComponents' => ['./ios-app/ios-assets/res/*']}
  
  # s.requires_arc = true
  # s.ios.deployment_target = '9.0'
  s.swift_version = '4.2'
  #s.resources   = "./ios-app/assets/js/index.ios.bundle"
  #s.resource_bundles = {'TimesReactIOSBundle' => './ios-app/assets/js/index.ios.bundle'}
  
  # React, and the subspecs we have to use
  s.dependency 'React/Core', react_native_version
  s.dependency 'React/CxxBridge', react_native_version
  s.dependency 'React/RCTAnimation', react_native_version
  s.dependency 'React/RCTCameraRoll', react_native_version
  s.dependency 'React/RCTImage', react_native_version
  s.dependency 'React/RCTLinkingIOS', react_native_version
  s.dependency 'React/RCTNetwork', react_native_version
  s.dependency 'React/RCTText', react_native_version
  s.dependency 'React/RCTGeolocation', react_native_version
  s.dependency 'React/RCTActionSheet', react_native_version
  s.dependency 'React/RCTWebSocket', react_native_version
  s.dependency 'React/DevSupport', react_native_version
  s.dependency 'React/ART', react_native_version

  # React's Dependencies
  # s.dependency 'yoga', "#{react_native_version}.React"

  # s.dependency 'DoubleConversion'
  # s.dependency 'Folly'
  # s.dependency 'glog'
  react_podspecs = [
    'node_modules/react-native/ReactCommon/yoga/yoga.podspec',
    'node_modules/react-native/third-party-podspecs/DoubleConversion.podspec',
    'node_modules/react-native/third-party-podspecs/Folly.podspec',
    'node_modules/react-native/third-party-podspecs/glog.podspec',
  ]

  # Native dependencies if any, which come from node_modules
  dep_podspecs = [
    # 'node_modules/react-native-svg/RNSVG.podspec'
  ]

  # Ties the exact versions so host apps don't need to guess the version
  # or have a potential mismatch
  podspecs = react_podspecs + dep_podspecs
  podspecs.each do |podspec_path|
    spec = Pod::Specification.from_file podspec_path
    s.dependency spec.name, "#{spec.version}"
  end
end
