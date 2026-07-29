import React, { useState } from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import {
  TextInput,
  Button,
  HelperText,
} from "react-native-paper";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { useLogin } from "../hooks/useLogin";

interface LoginFormData {
  user_name: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
}) => {
  const {
    login,
    loading,
  } = useLogin();

  const [secureTextEntry, setSecureTextEntry] =
    useState(true);

  const { control, handleSubmit, formState: { errors }} = useForm<LoginFormData>({
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      console.log("Submitting login form with data:", data);
      await login(data);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Username */}

      <Controller
        control={control}
        name="user_name"
        rules={{
          required: "Username is required",
        }}
        render={({
          field: {
            onChange,
            onBlur,
            value,
          },
        }) => (
          <>
            <TextInput
              mode="outlined"
              label="Username"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <HelperText
              type="error"
              visible={!!errors.user_name}
            >
              {errors.user_name?.message}
            </HelperText>
          </>
        )}
      />

      {/* Password */}

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 4,
            message:
              "Minimum 4 characters",
          },
        }}
        render={({
          field: {
            onChange,
            onBlur,
            value,
          },
        }) => (
          <>
            <TextInput
              mode="outlined"
              label="Password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={
                secureTextEntry
              }
              right={
                <TextInput.Icon
                  icon={
                    secureTextEntry
                      ? "eye-off"
                      : "eye"
                  }
                  onPress={() =>
                    setSecureTextEntry(
                      !secureTextEntry
                    )
                  }
                />
              }
            />

            <HelperText
              type="error"
              visible={!!errors.password}
            >
              {errors.password?.message}
            </HelperText>
          </>
        )}
      />

            <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },

  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
});