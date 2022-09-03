import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const ñSign = new GestureDescription('Ñ');
// [
//     [
//       "Thumb",
//       "Half Curl",
//       "Vertical Up"
//     ],
//     [
//       "Index",
//       "No Curl",
//       "Vertical Up"
//     ],
//     [
//       "Middle",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Ring",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Pinky",
//       "Full Curl",
//       "Vertical Up"
//     ]
//   ]


// thumb:
ñSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
ñSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
ñSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
ñSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ñSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
ñSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
ñSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
ñSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
ñSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
ñSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
ñSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
ñSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
ñSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
ñSign.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
ñSign.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
ñSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
ñSign.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
ñSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
ñSign.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);



