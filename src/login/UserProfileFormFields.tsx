import { useEffect, Fragment } from "react";
import { assert } from "keycloakify/tools/assert";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
  useUserProfileForm,
  getButtonToDisplayForMultivaluedAttributeField,
  type FormAction,
  type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "@/login/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/overrides/custom-password-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
  const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

  const { advancedMsg } = i18n;

  const {
    formState: { formFieldStates, isFormSubmittable },
    dispatchFormAction
  } = useUserProfileForm({
    kcContext,
    i18n,
    doMakeUserConfirmPassword
  });

  useEffect(() => {
    onIsFormSubmittableValueChange(isFormSubmittable);
  }, [isFormSubmittable]);

  const groupNameRef = { current: "" };

  return (
    <Fragment>
      {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
        return (
          <Fragment key={attribute.name}>
            <GroupLabel attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} />
            {BeforeField !== undefined && (
              <BeforeField
                attribute={attribute}
                dispatchFormAction={dispatchFormAction}
                displayableErrors={displayableErrors}
                valueOrValues={valueOrValues}
                kcClsx={kcClsx}
                i18n={i18n}
              />
            )}
            <div
              className="space-y-2"
              style={{
                display: attribute.name === "password-confirm" && !doMakeUserConfirmPassword ? "none" : undefined
              }}
            >
              <div>
                <Label htmlFor={attribute.name} className="text-sm font-medium">
                  {advancedMsg(attribute.displayName ?? "")}
                  {attribute.required && <span className="text-destructive ml-1">*</span>}
                </Label>

                {attribute.annotations.inputHelperTextBefore !== undefined && (
                  <div className="text-sm text-muted-foreground" id={`form-help-text-before-${attribute.name}`} aria-live="polite">
                    {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                  </div>
                )}
              </div>
              <div>
                <InputFieldByType
                  attribute={attribute}
                  valueOrValues={valueOrValues}
                  displayableErrors={displayableErrors}
                  dispatchFormAction={dispatchFormAction}
                  kcClsx={kcClsx}
                  i18n={i18n}
                />
                <FieldErrors attribute={attribute} displayableErrors={displayableErrors} fieldIndex={undefined} />
                {attribute.annotations.inputHelperTextAfter !== undefined && (
                  <div className="text-sm text-muted-foreground mt-2" id={`form-help-text-after-${attribute.name}`} aria-live="polite">
                    {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                  </div>
                )}

                {AfterField !== undefined && (
                  <AfterField
                    attribute={attribute}
                    dispatchFormAction={dispatchFormAction}
                    displayableErrors={displayableErrors}
                    valueOrValues={valueOrValues}
                    kcClsx={kcClsx}
                    i18n={i18n}
                  />
                )}
              </div>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
}

function GroupLabel(props: {
  attribute: Attribute;
  groupNameRef: {
    current: string;
  };
  i18n: I18n;
}) {
  const { attribute, groupNameRef, i18n } = props;

  const { advancedMsg } = i18n;

  if (attribute.group?.name !== groupNameRef.current) {
    groupNameRef.current = attribute.group?.name ?? "";

    if (groupNameRef.current !== "") {
      assert(attribute.group !== undefined);

      return (
        <Card
          className="mb-6"
          {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}
        >
          {(() => {
            const groupDisplayHeader = attribute.group.displayHeader ?? "";
            const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;

            const groupDisplayDescription = attribute.group.displayDescription ?? "";
            const groupDescriptionText = groupDisplayDescription !== "" ? advancedMsg(groupDisplayDescription) : "";

            return (
              <CardHeader>
                <CardTitle id={`header-${attribute.group.name}`}>{groupHeaderText}</CardTitle>
                {groupDescriptionText && <CardDescription id={`description-${attribute.group.name}`}>{groupDescriptionText}</CardDescription>}
              </CardHeader>
            );
          })()}
          <CardContent className="pb-4">{/* Form fields for this group will be rendered here */}</CardContent>
        </Card>
      );
    }
  }

  return null;
}

function FieldErrors(props: { attribute: Attribute; displayableErrors: FormFieldError[]; fieldIndex: number | undefined }) {
  const { attribute, fieldIndex } = props;

  const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

  if (displayableErrors.length === 0) {
    return null;
  }

  return (
    <div
      id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
      className="text-sm text-destructive mt-1"
      aria-live="polite"
    >
      {displayableErrors
        .filter(error => error.fieldIndex === fieldIndex)
        .map(({ errorMessage }, i, arr) => (
          <Fragment key={i}>
            {errorMessage}
            {arr.length - 1 !== i && <br />}
          </Fragment>
        ))}
    </div>
  );
}

type InputFieldByTypeProps = {
  attribute: Attribute;
  valueOrValues: string | string[];
  displayableErrors: FormFieldError[];
  dispatchFormAction: React.Dispatch<FormAction>;
  i18n: I18n;
  kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
  const { attribute, valueOrValues } = props;

  switch (attribute.annotations.inputType) {
    case "textarea":
      return <TextareaTag {...props} />;
    case "select":
    case "multiselect":
      return <SelectTag {...props} />;
    case "select-radiobuttons":
      return <RadioButtonsTag {...props} />;
    case "multiselect-checkboxes":
      return <CheckboxesTag {...props} />;
    default: {
      if (valueOrValues instanceof Array) {
        return (
          <div className="space-y-4">
            {valueOrValues.map((...[, i]) => (
              <InputTag key={i} {...props} fieldIndex={i} />
            ))}
          </div>
        );
      }

      const inputNode = <InputTag {...props} fieldIndex={undefined} />;

      return inputNode;
    }
  }
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
  const { attribute, fieldIndex, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;

  const { advancedMsgStr } = i18n;

  const inputValue = (() => {
    if (fieldIndex !== undefined) {
      assert(valueOrValues instanceof Array);
      return valueOrValues[fieldIndex];
    }

    assert(typeof valueOrValues === "string");
    return valueOrValues;
  })();

  const hasError = displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined;

  const inputType = (() => {
    const { inputType } = attribute.annotations;

    if (inputType?.startsWith("html5-")) {
      return inputType.slice(6);
    }

    return inputType ?? "text";
  })();

  const isPassword = attribute.name === "password" || attribute.name === "password-confirm";
  const InputComponent = isPassword ? PasswordInput : Input;

  return (
    <div className="relative">
      <InputComponent
        type={inputType}
        id={attribute.name}
        name={attribute.name}
        value={inputValue}
        className={hasError ? "border-destructive" : ""}
        aria-invalid={hasError}
        disabled={attribute.readOnly}
        autoComplete={attribute.autocomplete}
        placeholder={
          attribute.annotations.inputTypePlaceholder === undefined ? undefined : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
        }
        pattern={attribute.annotations.inputTypePattern}
        size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
        maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
        minLength={attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)}
        max={attribute.annotations.inputTypeMax}
        min={attribute.annotations.inputTypeMin}
        step={attribute.annotations.inputTypeStep}
        {...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]))}
        onChange={event =>
          dispatchFormAction({
            action: "update",
            name: attribute.name,
            valueOrValues: (() => {
              if (fieldIndex !== undefined) {
                assert(valueOrValues instanceof Array);

                return valueOrValues.map((value, i) => {
                  if (i === fieldIndex) {
                    return event.target.value;
                  }

                  return value;
                });
              }

              return event.target.value;
            })()
          })
        }
        onBlur={() =>
          dispatchFormAction({
            action: "focus lost",
            name: attribute.name,
            fieldIndex: fieldIndex
          })
        }
      />
      {(() => {
        if (fieldIndex === undefined) {
          return null;
        }

        assert(valueOrValues instanceof Array);
        const values = valueOrValues;

        return (
          <>
            <FieldErrors attribute={attribute} displayableErrors={displayableErrors} fieldIndex={fieldIndex} />
            <AddRemoveButtonsMultiValuedAttribute
              attribute={attribute}
              values={values}
              fieldIndex={fieldIndex}
              dispatchFormAction={dispatchFormAction}
              i18n={i18n}
            />
          </>
        );
      })()}
    </div>
  );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
  attribute: Attribute;
  values: string[];
  fieldIndex: number;
  dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
  i18n: I18n;
}) {
  const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;
  const { msg } = i18n;
  const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });

  return (
    <div className="mt-2 flex gap-2">
      {hasRemove && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            dispatchFormAction({
              action: "update",
              name: attribute.name,
              valueOrValues: values.filter((_, i) => i !== fieldIndex)
            })
          }
        >
          {msg("remove")}
        </Button>
      )}
      {hasAdd && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            dispatchFormAction({
              action: "update",
              name: attribute.name,
              valueOrValues: [...values, ""]
            })
          }
        >
          {msg("addValue")}
        </Button>
      )}
    </div>
  );
}

function RadioButtonsTag(props: InputFieldByTypeProps) {
  const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

  assert(typeof valueOrValues === "string");
  const value = valueOrValues;

  const options = getInputOptions(attribute);

  return (
    <RadioGroup
      value={value}
      onValueChange={value =>
        dispatchFormAction({
          action: "update",
          name: attribute.name,
          valueOrValues: value
        })
      }
      onBlur={() =>
        dispatchFormAction({
          action: "focus lost",
          name: attribute.name,
          fieldIndex: undefined
        })
      }
      disabled={attribute.readOnly}
    >
      <div className="space-y-2">
        {options.map(option => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${attribute.name}-${option}`} />
            <Label htmlFor={`${attribute.name}-${option}`} className={attribute.readOnly ? "opacity-50" : ""}>
              {inputLabel(i18n, attribute, option)}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}

function CheckboxesTag(props: InputFieldByTypeProps) {
  const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

  assert(valueOrValues instanceof Array);
  const values = valueOrValues;

  const options = getInputOptions(attribute);

  return (
    <div className="space-y-2">
      {options.map(option => {
        const isChecked = values.includes(option);

        return (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${attribute.name}-${option}`}
              checked={isChecked}
              disabled={attribute.readOnly}
              onCheckedChange={checked => {
                const newValues = [...values];

                if (checked) {
                  if (!newValues.includes(option)) {
                    newValues.push(option);
                  }
                } else {
                  const index = newValues.indexOf(option);
                  if (index !== -1) {
                    newValues.splice(index, 1);
                  }
                }

                dispatchFormAction({
                  action: "update",
                  name: attribute.name,
                  valueOrValues: newValues
                });
              }}
              onBlur={() =>
                dispatchFormAction({
                  action: "focus lost",
                  name: attribute.name,
                  fieldIndex: undefined
                })
              }
            />
            <Label htmlFor={`${attribute.name}-${option}`} className={attribute.readOnly ? "opacity-50" : ""}>
              {inputLabel(i18n, attribute, option)}
            </Label>
          </div>
        );
      })}
    </div>
  );
}

function TextareaTag(props: InputFieldByTypeProps) {
  const { attribute, dispatchFormAction, displayableErrors, valueOrValues } = props;

  assert(typeof valueOrValues === "string");
  const value = valueOrValues;

  const hasError = displayableErrors.length !== 0;

  return (
    <Textarea
      id={attribute.name}
      name={attribute.name}
      className={hasError ? "border-destructive" : ""}
      aria-invalid={hasError}
      disabled={attribute.readOnly}
      rows={attribute.annotations.inputTypeRows === undefined ? 3 : parseInt(`${attribute.annotations.inputTypeRows}`)}
      maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
      value={value}
      onChange={event =>
        dispatchFormAction({
          action: "update",
          name: attribute.name,
          valueOrValues: event.target.value
        })
      }
      onBlur={() =>
        dispatchFormAction({
          action: "focus lost",
          name: attribute.name,
          fieldIndex: undefined
        })
      }
    />
  );
}

function SelectTag(props: InputFieldByTypeProps) {
  const { attribute, dispatchFormAction, displayableErrors, i18n, valueOrValues } = props;

  const isMultiple = attribute.annotations.inputType === "multiselect";
  const hasError = displayableErrors.length !== 0;
  const options = getInputOptions(attribute);

  if (isMultiple) {
    assert(valueOrValues instanceof Array);

    // For multiselect, we need a custom implementation
    // since shadcn doesn't directly support multiple select
    // This is simplified and would need enhancement for production
    return (
      <div className="space-y-2">
        {options.map(option => {
          const isSelected = valueOrValues.includes(option);

          return (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${attribute.name}-${option}`}
                checked={isSelected}
                disabled={attribute.readOnly}
                onCheckedChange={checked => {
                  let newValues = [...valueOrValues];

                  if (checked) {
                    if (!newValues.includes(option)) {
                      newValues.push(option);
                    }
                  } else {
                    newValues = newValues.filter(value => value !== option);
                  }

                  dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: newValues
                  });
                }}
                onBlur={() =>
                  dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                  })
                }
              />
              <Label htmlFor={`${attribute.name}-${option}`}>{inputLabel(i18n, attribute, option)}</Label>
            </div>
          );
        })}
      </div>
    );
  }

  assert(typeof valueOrValues === "string");

  return (
    <Select
      disabled={attribute.readOnly}
      value={valueOrValues}
      onValueChange={value =>
        dispatchFormAction({
          action: "update",
          name: attribute.name,
          valueOrValues: value
        })
      }
      onOpenChange={() => {
        if (!attribute.readOnly) {
          dispatchFormAction({
            action: "focus lost",
            name: attribute.name,
            fieldIndex: undefined
          });
        }
      }}
    >
      <SelectTrigger className={hasError ? "border-destructive" : ""}>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {inputLabel(i18n, attribute, option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function getInputOptions(attribute: Attribute): string[] {
  // Helper function to get options from validators
  const { inputOptionsFromValidation } = attribute.annotations;

  if (inputOptionsFromValidation !== undefined) {
    const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

    if (validator?.options !== undefined) {
      return validator.options;
    }
  }

  return attribute.validators.options?.options ?? [];
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
  const { advancedMsg } = i18n;

  if (attribute.annotations.inputOptionLabels !== undefined) {
    const { inputOptionLabels } = attribute.annotations;

    return advancedMsg(inputOptionLabels[option] ?? option);
  }

  if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
    return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
  }

  return option;
}
