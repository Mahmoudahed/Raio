import { Alert } from 'react-native';

// أنواع الأخطاء
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTH = 'AUTH',
  UNKNOWN = 'UNKNOWN'
}

// واجهة الخطأ المخصصة
export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  originalError?: any;
}

// فئة الخطأ المخصصة
export class CustomError extends Error implements AppError {
  type: ErrorType;
  code?: string;
  originalError?: any;

  constructor(type: ErrorType, message: string, code?: string, originalError?: any) {
    super(message);
    this.type = type;
    this.code = code;
    this.originalError = originalError;
    this.name = 'CustomError';
  }
}

// معالج الأخطاء الرئيسي
export const handleError = (error: any): AppError => {
  // إذا كان الخطأ من نوع CustomError، نعيده كما هو
  if (error instanceof CustomError) {
    return error;
  }

  // معالجة أخطاء الشبكة
  if (error.message?.includes('Network Error') || error.message?.includes('network')) {
    return new CustomError(
      ErrorType.NETWORK,
      'حدث خطأ في الاتصال بالشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
      'NETWORK_ERROR',
      error
    );
  }

  // معالجة أخطاء API
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 401:
        return new CustomError(
          ErrorType.AUTH,
          'غير مصرح لك بالوصول. يرجى تسجيل الدخول مرة أخرى.',
          'UNAUTHORIZED',
          error
        );
      case 403:
        return new CustomError(
          ErrorType.AUTH,
          'ليس لديك الصلاحيات الكافية للقيام بهذه العملية.',
          'FORBIDDEN',
          error
        );
      case 404:
        return new CustomError(
          ErrorType.API,
          'لم يتم العثور على المورد المطلوب.',
          'NOT_FOUND',
          error
        );
      case 500:
        return new CustomError(
          ErrorType.API,
          'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
          'SERVER_ERROR',
          error
        );
      default:
        return new CustomError(
          ErrorType.API,
          'حدث خطأ في الاتصال بالخادم.',
          'API_ERROR',
          error
        );
    }
  }

  // معالجة الأخطاء غير المعروفة
  return new CustomError(
    ErrorType.UNKNOWN,
    'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    'UNKNOWN_ERROR',
    error
  );
};

// عرض رسالة الخطأ للمستخدم
export const showErrorAlert = (error: AppError) => {
  Alert.alert(
    'خطأ',
    error.message,
    [{ text: 'حسناً', style: 'default' }]
  );
};

// معالج الأخطاء للوظائف غير المتزامنة
export const asyncErrorHandler = async <T>(
  promise: Promise<T>,
  errorMessage: string = 'حدث خطأ غير متوقع'
): Promise<[T | null, AppError | null]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    const handledError = handleError(error);
    return [null, handledError];
  }
}; 