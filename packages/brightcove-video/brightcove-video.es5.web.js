"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require("react");var _react2=_interopRequireDefault(_react);
var _reactNative=require("react-native");

var _brightcoveVideo=require("./brightcove-video.proptypes");var _brightcoveVideo2=_interopRequireDefault(_brightcoveVideo);
var _brightcoveVideo3=require("./brightcove-video.defaults");var _brightcoveVideo4=_interopRequireDefault(_brightcoveVideo3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var index=0;var

BrightcoveVideo=function(_Component){_inherits(BrightcoveVideo,_Component);_createClass(BrightcoveVideo,null,[{key:"handlePlayerReady",value:function handlePlayerReady(
context){
context.setPlayer(this);

this.on("play",context.onPlay.bind(context,this));
this.on("pause",context.onPause.bind(context,this));
this.on("seeked",context.onSeeked.bind(context,this));
}},{key:"appendScript",value:function appendScript(

s){
document.body.appendChild(s);
}},{key:"getScriptUrl",value:function getScriptUrl(

accountId){
return"//players.brightcove.net/"+accountId+"/default_default/index.min.js";
}}]);

function BrightcoveVideo(props){_classCallCheck(this,BrightcoveVideo);var _this=_possibleConstructorReturn(this,(BrightcoveVideo.__proto__||Object.getPrototypeOf(BrightcoveVideo)).call(this,
props));

index+=1;

_this.state={
id:props.videoId+"-"+props.accountId+"-"+index,
accountId:props.accountId,
videoId:props.videoId,
errors:[].concat(BrightcoveVideo.globalErrors),
playerStatus:"paused",
playheadPosition:0};return _this;

}_createClass(BrightcoveVideo,[{key:"componentDidMount",value:function componentDidMount()

{var _this2=this;
if(this.state.errors.length){
return;
}


if(!BrightcoveVideo.players){
BrightcoveVideo.players=[];

var s=this.createScript();

s.onload=function(){
BrightcoveVideo.players.forEach(function(player){return(
player.initVideoJS(player.state.id));});

};


s.onerror=function(err){
var uriErr={
code:"",
message:"The script "+err.target.src+" is not accessible."};


BrightcoveVideo.globalErrors.push(uriErr);

_this2.emitError(uriErr);
};

BrightcoveVideo.appendScript(s);
}

this.init();
}},{key:"componentWillUnmount",value:function componentWillUnmount()

{
if(this.player){
this.player.dispose();
}
}},{key:"onError",value:function onError(

player){
this.emitError(player.error());
}},{key:"onPlay",value:function onPlay(

player){
this.setState({
playerStatus:"playing",
playheadPosition:player.currentTime()});


this.emitState();
}},{key:"onPause",value:function onPause(

player){
this.setState({
playerStatus:"paused",
playheadPosition:player.currentTime()});


this.emitState();
}},{key:"onSeeked",value:function onSeeked(

player){
this.setState({
playheadPosition:player.currentTime()});


this.emitState();
}},{key:"setPlayer",value:function setPlayer(

player){
this.player=player;
}},{key:"createScript",value:function createScript()

{
var s=document.createElement("script");
s.src=BrightcoveVideo.getScriptUrl(this.props.accountId);

return s;
}},{key:"emitState",value:function emitState()

{
this.props.onChange(this.state);
}},{key:"emitError",value:function emitError(

err){
var errors=[].concat(this.state.errors);
errors.push(err);
this.setState({errors:errors});
this.props.onError(err);
}},{key:"initVideoJS",value:function initVideoJS(

id){
var player=videojs(id);
var handler=BrightcoveVideo.handlePlayerReady.bind(player,this);

player.ready(handler);
player.on("error",this.onError.bind(this,player));
}},{key:"initVideo",value:function initVideo(

id){
bc(document.getElementById(id));
this.initVideoJS(id);
}},{key:"init",value:function init()

{
if(window.bc&&window.videojs){
this.initVideo(this.state.id);
}else{
BrightcoveVideo.players.push(this);
}
}},{key:"render",value:function render()

{
if(this.state.errors.length){


var errorItems=this.state.errors.map(function(error){return(
_react2.default.createElement("li",{key:error.code+"_"+error.message,style:{color:"white"}},
error.code," - ",error.message));});



return(
_react2.default.createElement(_reactNative.View,{
style:{
width:this.props.width,
height:this.props.height,
backgroundColor:"red"}},


_react2.default.createElement("ul",null,errorItems)));


}


return(
_react2.default.createElement("div",null,
_react2.default.createElement("video",{
id:this.state.id,
width:this.props.width,
height:this.props.height,
poster:this.props.poster,
"data-embed":"default",
"data-video-id":this.props.videoId,
"data-account":this.props.accountId,
"data-player":"default",
"data-application-id":true,
className:"video-js",
controls:true})));



}}]);return BrightcoveVideo;}(_react.Component);


BrightcoveVideo.globalErrors=[];

BrightcoveVideo.defaultProps=_brightcoveVideo4.default;
BrightcoveVideo.propTypes=_brightcoveVideo2.default;exports.default=

BrightcoveVideo;module.exports=exports["default"];