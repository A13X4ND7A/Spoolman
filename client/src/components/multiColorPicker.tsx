import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Badge, Button, ColorPicker, Space } from "antd";

function generateRandomColor() {
  return "000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
}

function generateInitialColors(num: number) {const colors: string[] = [];
  for (let i = 0; i < num; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
}

/**
 * An Ant Design compatible form input for multiple color pickers
 * The value is a comma separated list of hex values, without hashtags
 * @param props
 * @returns
 */
export function MultiColorPicker(props: {
  value?: string | null | undefined;
  onChange?: (value: string | null | undefined) => void;
  min?: number;
  max?: number;
}) {
  const values = props.value ? props.value.split(",") : generateInitialColors(props.min ?? 0);
  if (!props.value && props.onChange) {
    // Update value immediately
    props.onChange(values.join(","));
  }
  const pickers = values.map((value, idx) => (
    <Badge
      key={idx}
      count={
        values.length > (props.min ?? 0) ? (
          <span className="ant-badge-count">
            <CloseOutlined
              onClick={() => {
                // Remove this picker
                if (props.onChange) {
                  props.onChange(values.filter((v, i) => i !== idx).join(","));
                }
              }}
            />
          </span>
        ) : (
          <></>
        )
      }
    >
      <ColorPicker
        value={value}
        onChange={(clr) => {
          if (props.onChange) {
            props.onChange(values.map((v, i) => (i === idx ? clr.toHex() : v)).join(","));
          }
        }}
      />
    </Badge>
  ));

  return (
    <>
      <Space direction="horizontal" size="middle" style={{ marginTop: "1em" }}>
        {pickers}
        {values.length < (props.max ?? Infinity) && (
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              if (props.onChange) {
                props.onChange(values.concat(generateRandomColor()).join(","));
              }
            }}
          />
        )}
      </Space>
    </>
  );
}
