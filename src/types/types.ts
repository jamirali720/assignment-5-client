export type TSignUpUser = {  
  name: string;
  email: string;
  password: string;  
  phone: string;
  address: string; 
  image: string;  
};
export type TLoginUser = {    
  email: string;
  password: string;     
};

export type TUserResponse = {
  data:  {
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
    image: {
      url: string;
      public_id: string;
    };
    createdAt: string;
    updatedAt: string;
  } 
  statusCode: number;
  message: string | null;
  success: boolean;
};
export type TRenderUser = {  
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
    image: {
      url: string;
      public_id: string;
    };
    createdAt: string;
    updatedAt: string;  
};


export type TBikeRequest = {  
  name: string;
  description: string;
  pricePerHour: string;  
  cc: string;
  year: string;
  model: string;
  brand: string;
  file: string;  
};


export type TBikeResponse = {
  _id?: string;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: string;
  year: number;
  model: string;
  brand: string;
  ratings: number;
  numberOfReviews: number;
  image: {
    url: string;
    public_id: string;
  };
  reviews: [
    {
      username: string;
      email: string;
      message: string;
      rating: number;
    }
  ];
};


export type TResponseArray = {
  data: TBikeResponse[];
  statusCode: number;
  message: string | null;
  success: boolean;
};
export type TSingleResponse = {
  data: TBikeResponse;
  statusCode: number;
  message: string | null;
  success: boolean;
};



export interface IBookingState {
  remainingCost: number;
  bookingId:string;
  bookingInfo: {
    bikeId: string;
    startTime: string;
    advanced: number;
  };
}

export interface IErrorResponse {
  status: number;
  data: {
    message: string;
    errorSource?: [{ path: string; message: string }];
    statusCode?: number;
    stack: string;
    success: boolean;
  };
}

export interface IErrorResponseStatus {
  error: string;
  status: string;
}


export type TReview = {
  _id: string;
  id: string;
  username: string;
  email: string;
  message: string;
  rating: number;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: {
      url: string;
      public_id: string;
    }
  }
};

export interface ITheme {
  theme: "flat" | "stripe" | "night" | undefined;
}

export type TLayout = {
  layout: "tabs";
};

export type TContact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type TBikeRental = { 
  bikeItems: TBikeResponse[];
  totalAmount: number; 
  paymentInfo: { id: string; status: string };
};

// rental response types from here
export interface IBikeItems {
  _id?: string;
  bikeName: string;
  price: number;
  bikeId: string;
  image: string;
  hours: number;
}
export interface IPayment {
  paymentInfo: {
    id: string;
    status: string;
  };
}



export interface ITeamMember {
  _id: string;
  name: string;
  email: string;
  phoneNo:string;
  role: string; 
  image: {
    url: string;
    public_id: string;
  };
}

export interface TBookingResponse {
  _id: string;
  userId: string;
  bikeId: {
    name: string;
  };
  advanced: number;
  startTime: string;
  returnTime: string | null;
  isReturned: boolean;
  totalCost: number;
  remainingCost: number;
  paymentId: string;
  isReturnedMoney:boolean;
}


export type TAuthState ={
  user: null | object;
  token: null | string
}

export type TDecodedResult ={
 email: string;
 exp:string;
 iat: string;
 userId: string;
  role: string;
}

export type TImageUpload ={
  image: string
}


export type THeroImage = {
  image: {
    url: string;
    public_id: string;
  };
  _id: string
};


export type RefreshResult = {
  data?: {
    success: boolean;
    message: string;
    statusCode: number;
    token: string;
  };
  meta?: { request: Request; response: Response };
};

export interface ITeam {
  _id?: string;
  name: string;
  role: string;
  image: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  githubLink: string;
  youtubeLink: string;
  instagramLink: string;
}

export interface ITeamResponse {
  _id: string;
  name: string;
  role: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  githubLink: string;
  instagramLink: string;
  image: {
    url: string;
    public_id: string;
  };
  updatedAt: string;
  createdAt: string;
}


export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}