import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { GenericAction } from "../../store/genericSlice";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

type ListnerState = {
  name?: string;
  unsubscribe: () => void;
};

export const useFirestore = <T extends DocumentData>(path: string) => {
  const listnerRef = useRef<ListnerState[]>([]);

  useEffect(() => {
    let listnerRefValue: ListnerState[] | null = null;
    if (listnerRef.current) {
      listnerRefValue = listnerRef.current;
    }
    return () => {
      if (listnerRefValue) {
        listnerRef.current.forEach((listner) => {
          listner.unsubscribe();
        });
      }
    };
  }, []);

  const dispatch = useAppDispatch();

  const loadCollection = useCallback(
    (actions: GenericAction<T>) => {
      dispatch(actions.loading());
      const query = collection(db, path);
      const listner = onSnapshot(query, {
        next: (querySnapshot) => {
          const data: DocumentData[] = [];
          if (querySnapshot.empty) {
            dispatch(actions.success([] as unknown as T));
            return;
          }
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          dispatch(actions.success(data as unknown as T));
        },
        error: (error) => {
          toast.error(error.message);
          console.log(error.message);
        },
      });

      listnerRef.current.push({ name: path, unsubscribe: listner });
    },

    [dispatch, path]
  );
  const loadDocument = useCallback(
    (id: string, actions: GenericAction<T>) => {
      dispatch(actions.loading());
      const docRef = doc(db, path, id);
      const listner = onSnapshot(docRef, {
        next: (doc) => {
          if (!doc.exists) {
            dispatch(actions.error("Document does not exit"));
            return;
          }
          dispatch(
            actions.success({ id: doc.id, ...doc.data() } as unknown as T)
          );
        },
      });
      listnerRef.current.push({ name: path + "/" + id, unsubscribe: listner });
    },
    [dispatch, path]
  );
  const create = async (data: T) => {
    try {
      const ref = doc(collection(db, path));
      await setDoc(ref, data);
      return ref;
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const update = async (id: string, data: T) => {
    try {
      const docRef = doc(db, path, id);
      await updateDoc(docRef, data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const remove = async (id: string) => {
    try {
      return await deleteDoc(doc(db, path, id));
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const set = async (id: string, data: T) => {
    try {
      await setDoc(doc(db, path, id), data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return { loadCollection, loadDocument, create, update, remove, set };
};
