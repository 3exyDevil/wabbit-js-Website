
msg = "Kermit_Xaro - Backend Developer"; +  msg; pos = 0;
msg = msg + ' | ';
function scrollMSG() {
    document.title = msg.substring(pos, msg.length) + msg.substring(0, pos);
    pos++;
    if (pos > msg.length) pos = 0
    window.setTimeout("scrollMSG()", 200);
}
scrollMSG();